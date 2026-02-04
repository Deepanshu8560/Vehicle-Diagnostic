import React from 'react';
import useVehicleStore from '../store/vehicleStore';
import useSettingsStore from '../store/settingsStore';
import VehicleStatusHero from '../components/VehicleStatusHero';
import BatteryHealthCard from '../components/BatteryHealthCard';
import MotorStatusCard from '../components/MotorStatusCard';
import TirePressureCard from '../components/TirePressureCard';
import GPSStatusCard from '../components/GPSStatusCard';

const Dashboard = () => {
  const { selectedVehicle, diagnostics } = useVehicleStore();
  const { compactMode } = useSettingsStore();

  const gapClass = compactMode ? 'gap-2 md:gap-3' : 'gap-4 md:gap-6';
  const marginClass = compactMode ? 'mt-2' : 'mt-4';

  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 ${gapClass}`}>
      {/* Hero Section - spans 2 columns on desktop */}
      <VehicleStatusHero vehicle={selectedVehicle} diagnostics={diagnostics} />

      {/* Diagnostic Cards */}
      <BatteryHealthCard diagnostics={diagnostics} />
      <MotorStatusCard diagnostics={diagnostics} />
      <TirePressureCard diagnostics={diagnostics} />
      <GPSStatusCard diagnostics={diagnostics} />

      {/* Footer Info specifically for Dashboard view */}
      <div className={`col-span-1 md:col-span-3 ${marginClass} text-center`}>
        <p className="text-xs text-[#52525B]">
          Last updated: {diagnostics?.timestamp ? new Date(diagnostics.timestamp).toLocaleTimeString() : 'N/A'}
        </p>
        <p className="text-xs text-[#52525B] mt-1">
          Data refreshes every 3 seconds
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
