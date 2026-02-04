import { useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import '@/App.css';
import axios from 'axios';
import useVehicleStore from '@/store/vehicleStore';
import useSettingsStore from '@/store/settingsStore';
import VehicleSelector from '@/components/VehicleSelector';
import Sidebar from '@/components/Sidebar';

// Pages
import Dashboard from '@/pages/Dashboard';
import Energy from '@/pages/Energy';
import Analytics from '@/pages/Analytics';
import Settings from '@/pages/Settings';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || '';
const API = `${BACKEND_URL}/api`;

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function AppContent() {
  const {
    vehicles,
    selectedVehicle,
    setVehicles,
    setSelectedVehicle,
    setDiagnostics,
    setLoading,
    setError,
    loading
  } = useVehicleStore();
  const { darkMode } = useSettingsStore(); // Added this line

  // Added theme object
  const theme = {
    bg: darkMode ? 'bg-[#050505]' : 'bg-gray-50',
    text: darkMode ? 'text-white' : 'text-gray-900',
    headerBg: darkMode ? 'bg-[#050505]/95' : 'bg-white/95',
    headerBorder: darkMode ? 'border-white/10' : 'border-gray-200',
    subText: darkMode ? 'text-[#A1A1AA]' : 'text-gray-500'
  };

  // Fetch vehicles on mount
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API}/vehicles`);
        setVehicles(response.data);
        if (response.data.length > 0 && !selectedVehicle) {
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
  }, [setVehicles, setSelectedVehicle, setLoading, setError, selectedVehicle]);

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
      <div className={`min-h-screen ${theme.bg} flex items-center justify-center`} data-testid="app-loading">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#3E6AE1] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className={`${theme.text} text-lg`}>Loading Vehicle Systems...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${theme.bg} ${theme.text} transition-colors duration-300`} data-testid="app-container">
      {/* Header */}
      <header className={`border-b ${theme.headerBorder} ${theme.headerBg} backdrop-blur-sm sticky top-0 z-50 transition-colors duration-300`}>
        <div className="container mx-auto px-4 md:px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight" data-testid="app-title">
                Tesla Diagnostics
              </h1>
              <p className={`text-sm ${theme.subText} mt-1`}>Real-time Vehicle Telemetry</p>
            </div>
            <div className="flex items-center gap-4">
              <VehicleSelector />
              <Sidebar />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 md:px-6 py-6">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/energy" element={<Energy />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppContent />
    </Router>
  );
}

export default App;