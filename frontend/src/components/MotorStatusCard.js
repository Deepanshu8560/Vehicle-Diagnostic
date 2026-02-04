import { Gauge, Thermometer, Zap, TrendingUp } from 'lucide-react';

const MotorStatusCard = ({ diagnostics }) => {
  if (!diagnostics?.motor) {
    return (
      <div className="bg-[#121212] border border-white/10 rounded-xl p-6 animate-pulse" data-testid="motor-card-loading">
        <div className="h-6 bg-white/10 rounded w-1/2 mb-4"></div>
        <div className="space-y-4">
          <div className="h-16 bg-white/10 rounded"></div>
          <div className="h-16 bg-white/10 rounded"></div>
        </div>
      </div>
    );
  }

  const { temperature, rpm, power_output, efficiency } = diagnostics.motor;
  const tempColor = temperature < 70 ? '#22C55E' : temperature < 85 ? '#EAB308' : '#EF4444';
  const tempStatus = temperature < 70 ? 'Optimal' : temperature < 85 ? 'Warm' : 'Hot';

  return (
    <div className="bg-[#121212] border border-white/10 rounded-xl p-6 hover:border-[#3E6AE1]/50 transition-all duration-300" data-testid="motor-status-card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Gauge className="w-5 h-5 text-[#3E6AE1]" data-testid="motor-icon" />
          <h3 className="text-lg font-semibold text-white">Motor Status</h3>
        </div>
        <span className="text-sm text-[#A1A1AA] uppercase tracking-wider" data-testid="motor-status">
          Active
        </span>
      </div>

      <div className="space-y-4">
        {/* Temperature */}
        <div className="bg-[#1A1A1A] rounded-lg p-4" data-testid="motor-temperature">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Thermometer className="w-4 h-4" style={{ color: tempColor }} />
              <span className="text-sm text-[#A1A1AA]">Temperature</span>
            </div>
            <span className="text-xs px-2 py-1 rounded-full" style={{ backgroundColor: `${tempColor}20`, color: tempColor }}>
              {tempStatus}
            </span>
          </div>
          <p className="text-2xl font-bold text-white">{temperature}°C</p>
          <div className="mt-2 h-2 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full rounded-full transition-all duration-500"
              style={{ 
                width: `${Math.min((temperature / 100) * 100, 100)}%`,
                backgroundColor: tempColor
              }}
            ></div>
          </div>
        </div>

        {/* RPM and Power */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-[#1A1A1A] rounded-lg p-4" data-testid="motor-rpm">
            <div className="flex items-center gap-2 mb-2">
              <Gauge className="w-4 h-4 text-[#3E6AE1]" />
              <span className="text-xs text-[#A1A1AA]">RPM</span>
            </div>
            <p className="text-xl font-bold text-white">{rpm.toLocaleString()}</p>
          </div>
          <div className="bg-[#1A1A1A] rounded-lg p-4" data-testid="motor-power">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4 text-[#EAB308]" />
              <span className="text-xs text-[#A1A1AA]">Power</span>
            </div>
            <p className="text-xl font-bold text-white">{power_output} kW</p>
          </div>
        </div>

        {/* Efficiency */}
        <div className="bg-[#1A1A1A] rounded-lg p-4" data-testid="motor-efficiency">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#22C55E]" />
              <span className="text-sm text-[#A1A1AA]">Efficiency</span>
            </div>
            <p className="text-lg font-bold text-[#22C55E]">{efficiency}%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MotorStatusCard;