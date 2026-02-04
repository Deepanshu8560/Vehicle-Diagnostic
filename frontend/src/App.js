import { useEffect, useCallback } from 'react';
import '@/App.css';
import axios from 'axios';
import useVehicleStore from '@/store/vehicleStore';
import VehicleSelector from '@/components/VehicleSelector';
import VehicleStatusHero from '@/components/VehicleStatusHero';
import BatteryHealthCard from '@/components/BatteryHealthCard';
import MotorStatusCard from '@/components/MotorStatusCard';
import TirePressureCard from '@/components/TirePressureCard';
import GPSStatusCard from '@/components/GPSStatusCard';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

function App() {
  const { 
    vehicles, 
    selectedVehicle, 
    diagnostics, 
    loading,
    setVehicles, 
    setSelectedVehicle,
    setDiagnostics,
    setLoading,
    setError 
  } = useVehicleStore();

  // Fetch vehicles on mount
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API}/vehicles`);
        setVehicles(response.data);
        if (response.data.length > 0) {
          setSelectedVehicle(response.data[0]);
        }
      } catch (error) {
        console.error('Error fetching vehicles:', error);
        setError('Failed to load vehicles');
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, [setVehicles, setSelectedVehicle, setLoading, setError]);

  // Fetch diagnostics for selected vehicle
  const fetchDiagnostics = useCallback(async () => {
    if (!selectedVehicle) return;

    try {
      const response = await axios.get(`${API}/diagnostics/${selectedVehicle.id}`);
      setDiagnostics(response.data);
    } catch (error) {
      console.error('Error fetching diagnostics:', error);
      setError('Failed to load diagnostics');
    }
  }, [selectedVehicle, setDiagnostics, setError]);

  // Poll diagnostics every 3 seconds
  useEffect(() => {
    if (!selectedVehicle) return;

    fetchDiagnostics();
    const interval = setInterval(fetchDiagnostics, 3000);

    return () => clearInterval(interval);
  }, [selectedVehicle, fetchDiagnostics]);

  if (loading && vehicles.length === 0) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center" data-testid="app-loading">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#3E6AE1] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading Vehicle Systems...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white" data-testid="app-container">
      {/* Header */}
      <header className="border-b border-white/10 bg-[#050505]/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 md:px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight" data-testid="app-title">
                Tesla Diagnostics
              </h1>
              <p className="text-sm text-[#A1A1AA] mt-1">Real-time Vehicle Telemetry</p>
            </div>
            <VehicleSelector />
          </div>
        </div>
      </header>

      {/* Main Dashboard */}
      <main className="container mx-auto px-4 md:px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {/* Hero Section - spans 2 columns on desktop */}
          <VehicleStatusHero vehicle={selectedVehicle} diagnostics={diagnostics} />

          {/* Diagnostic Cards */}
          <BatteryHealthCard diagnostics={diagnostics} />
          <MotorStatusCard diagnostics={diagnostics} />
          <TirePressureCard diagnostics={diagnostics} />
          <GPSStatusCard diagnostics={diagnostics} />
        </div>

        {/* Footer Info */}
        <div className="mt-8 text-center" data-testid="last-update">
          <p className="text-xs text-[#52525B]">
            Last updated: {diagnostics?.timestamp ? new Date(diagnostics.timestamp).toLocaleTimeString() : 'N/A'}
          </p>
          <p className="text-xs text-[#52525B] mt-1">
            Data refreshes every 3 seconds
          </p>
        </div>
      </main>
    </div>
  );
}

export default App;