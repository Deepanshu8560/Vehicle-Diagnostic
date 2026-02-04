import { MapPin, Satellite, Navigation } from 'lucide-react';

const GPSStatusCard = ({ diagnostics }) => {
  if (!diagnostics?.gps) {
    return (
      <div className="bg-[#121212] border border-white/10 rounded-xl p-6 animate-pulse" data-testid="gps-card-loading">
        <div className="h-6 bg-white/10 rounded w-1/2 mb-4"></div>
        <div className="space-y-4">
          <div className="h-16 bg-white/10 rounded"></div>
          <div className="h-16 bg-white/10 rounded"></div>
        </div>
      </div>
    );
  }

  const { latitude, longitude, altitude, speed, satellites, signal_strength } = diagnostics.gps;
  
  const signalColor = signal_strength === 'excellent' ? '#22C55E' : 
                      signal_strength === 'good' ? '#3E6AE1' : '#EAB308';

  return (
    <div className="bg-[#121212] border border-white/10 rounded-xl p-6 hover:border-[#3E6AE1]/50 transition-all duration-300" data-testid="gps-status-card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-[#3E6AE1]" data-testid="gps-icon" />
          <h3 className="text-lg font-semibold text-white">GPS Status</h3>
        </div>
        <span 
          className="text-xs px-2 py-1 rounded-full capitalize" 
          style={{ backgroundColor: `${signalColor}20`, color: signalColor }}
          data-testid="gps-signal"
        >
          {signal_strength}
        </span>
      </div>

      <div className="space-y-4">
        {/* Coordinates */}
        <div className="bg-[#1A1A1A] rounded-lg p-4" data-testid="gps-coordinates">
          <div className="flex items-center gap-2 mb-2">
            <Navigation className="w-4 h-4 text-[#3E6AE1]" />
            <span className="text-sm text-[#A1A1AA]">Coordinates</span>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-mono text-white">
              Lat: <span className="text-[#3E6AE1]">{latitude}°</span>
            </p>
            <p className="text-sm font-mono text-white">
              Lon: <span className="text-[#3E6AE1]">{longitude}°</span>
            </p>
          </div>
        </div>

        {/* Satellites & Altitude */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-[#1A1A1A] rounded-lg p-4" data-testid="gps-satellites">
            <div className="flex items-center gap-2 mb-2">
              <Satellite className="w-4 h-4 text-[#22C55E]" />
              <span className="text-xs text-[#A1A1AA]">Satellites</span>
            </div>
            <p className="text-2xl font-bold text-white">{satellites}</p>
          </div>
          <div className="bg-[#1A1A1A] rounded-lg p-4" data-testid="gps-altitude">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs text-[#A1A1AA]">Altitude</span>
            </div>
            <p className="text-2xl font-bold text-white">{altitude}m</p>
          </div>
        </div>

        {/* Speed */}
        <div className="bg-[#1A1A1A] rounded-lg p-4" data-testid="gps-speed">
          <div className="flex items-center justify-between">
            <span className="text-sm text-[#A1A1AA]">Current Speed</span>
            <p className="text-lg font-bold text-white">{speed} km/h</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GPSStatusCard;