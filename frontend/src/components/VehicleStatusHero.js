import { Car, Gauge, Battery } from 'lucide-react';
import useSettingsStore from '../store/settingsStore';

const VehicleStatusHero = ({ vehicle, diagnostics }) => {
  const { distanceUnit, darkMode } = useSettingsStore();

  const theme = {
    cardBg: darkMode ? 'bg-[#121212]' : 'bg-white',
    border: darkMode ? 'border-white/10' : 'border-gray-200',
    text: darkMode ? 'text-white' : 'text-gray-900',
    subText: darkMode ? 'text-[#A1A1AA]' : 'text-gray-500',
    innerBg: darkMode ? 'bg-[#1A1A1A]' : 'bg-gray-50',
  };

  if (!vehicle) {
    return (
      <div className={`col-span-1 md:col-span-2 ${theme.cardBg} border ${theme.border} rounded-xl p-6 animate-pulse`} data-testid="hero-loading">
        <div className={`h-8 ${theme.innerBg} rounded w-1/3 mb-4`}></div>
        <div className={`h-48 ${theme.innerBg} rounded`}></div>
      </div>
    );
  }

  const batteryLevel = diagnostics?.battery?.level || 0;
  let speed = diagnostics?.speed || 0;
  let range = diagnostics?.range || 0;

  // Conversion logic
  if (distanceUnit === 'mi') {
    speed = Math.round(speed * 0.621371);
    range = Math.round(range * 0.621371);
  }

  return (
    <div
      className={`col-span-1 md:col-span-2 ${theme.cardBg} border ${theme.border} rounded-xl overflow-hidden hover:border-[#3E6AE1]/50 transition-all duration-300`}
      data-testid="vehicle-status-hero"
    >
      {/* Header */}
      <div className="p-6 pb-0">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className={`text-2xl md:text-3xl font-bold ${theme.text} mb-1`} data-testid="vehicle-name">
              {vehicle.name}
            </h2>
            <p className={`text-sm ${theme.subText}`} data-testid="vehicle-vin">VIN: {vehicle.vin}</p>
          </div>
          <div className="text-right">
            <p className={`text-xs ${theme.subText} mb-1`}>Year</p>
            <p className={`text-lg font-semibold ${theme.text}`} data-testid="vehicle-year">{vehicle.year}</p>
          </div>
        </div>
      </div>

      {/* Vehicle Image */}
      <div
        className="relative h-48 md:h-64 bg-gradient-to-b from-transparent to-[#050505]/50 flex items-center justify-center"
        data-testid="vehicle-image-container"
      >
        <img
          src="https://images.unsplash.com/photo-1676945009341-4bb62b036653?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMzV8MHwxfHNlYXJjaHwxfHxUZXNsYSUyME1vZGVsJTIwUyUyMGlzb2xhdGVkJTIwYmxhY2slMjBiYWNrZ3JvdW5kfGVufDB8fHx8MTc3MDIwNjUxMnww&ixlib=rb-4.1.0&q=85"
          alt="Tesla Vehicle"
          className="w-full h-full object-contain"
          data-testid="vehicle-image"
        />
        <div className={`absolute top-4 right-4 ${darkMode ? 'bg-black/60' : 'bg-white/60'} backdrop-blur-md px-3 py-2 rounded-lg border ${theme.border}`} data-testid="vehicle-color-badge">
          <p className={`text-xs ${theme.subText} mb-0.5`}>Color</p>
          <p className={`text-sm font-medium ${theme.text}`}>{vehicle.color}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 p-6">
        <div className={`${theme.innerBg} rounded-lg p-4 text-center`} data-testid="hero-battery">
          <Battery className="w-5 h-5 mx-auto mb-2 text-[#22C55E]" />
          <p className={`text-xs ${theme.subText} mb-1`}>Battery</p>
          <p className={`text-xl font-bold ${theme.text}`}>{batteryLevel}%</p>
        </div>
        <div className={`${theme.innerBg} rounded-lg p-4 text-center`} data-testid="hero-speed">
          <Gauge className="w-5 h-5 mx-auto mb-2 text-[#3E6AE1]" />
          <p className={`text-xs ${theme.subText} mb-1`}>Speed</p>
          <p className={`text-xl font-bold ${theme.text}`}>{speed} {distanceUnit === 'mi' ? 'mph' : 'km/h'}</p>
        </div>
        <div className={`${theme.innerBg} rounded-lg p-4 text-center`} data-testid="hero-range">
          <Car className="w-5 h-5 mx-auto mb-2 text-[#EAB308]" />
          <p className={`text-xs ${theme.subText} mb-1`}>Range</p>
          <p className={`text-xl font-bold ${theme.text}`}>{range} {distanceUnit}</p>
        </div>
      </div>
    </div>
  );
};

export default VehicleStatusHero;