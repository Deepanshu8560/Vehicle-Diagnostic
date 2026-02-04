import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { Battery, BatteryCharging, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';
import useSettingsStore from '../store/settingsStore';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const BatteryHealthCard = ({ diagnostics }) => {
  const [history, setHistory] = useState([]);
  const { temperatureUnit, darkMode } = useSettingsStore();

  const theme = {
    cardBg: darkMode ? 'bg-[#121212]' : 'bg-white',
    border: darkMode ? 'border-white/10' : 'border-gray-200',
    text: darkMode ? 'text-white' : 'text-gray-900',
    subText: darkMode ? 'text-[#A1A1AA]' : 'text-gray-500',
    grid: darkMode ? 'border-white/10' : 'border-gray-200',
  };

  useEffect(() => {
    if (diagnostics?.battery) {
      setHistory(prev => {
        const newHistory = [...prev, diagnostics.battery.level];
        return newHistory.slice(-20); // Keep last 20 data points
      });
    }
  }, [diagnostics]);

  const chartData = {
    labels: history.map((_, i) => ''),
    datasets: [
      {
        label: 'Battery Level',
        data: history,
        borderColor: '#22C55E',
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 200);
          gradient.addColorStop(0, 'rgba(34, 197, 94, 0.3)');
          gradient.addColorStop(1, 'rgba(34, 197, 94, 0)');
          return gradient;
        },
        fill: true,
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 0,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: darkMode ? '#1A1A1A' : '#FFFFFF',
        titleColor: darkMode ? '#FFFFFF' : '#111827',
        bodyColor: darkMode ? '#A1A1AA' : '#6B7280',
        borderColor: darkMode ? '#27272A' : '#E5E7EB',
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        display: false,
        grid: { display: false },
      },
      y: {
        display: false,
        min: 0,
        max: 100,
        grid: { display: false },
      },
    },
  };

  if (!diagnostics?.battery) {
    return (
      <div className={`${theme.cardBg} border ${theme.border} rounded-xl p-6 animate-pulse`} data-testid="battery-card-loading">
        <div className="h-6 bg-white/10 rounded w-1/2 mb-4"></div>
        <div className="h-32 bg-white/10 rounded"></div>
      </div>
    );
  }

  const { level, health, voltage, temperature, charging } = diagnostics.battery;
  const batteryColor = level > 50 ? '#22C55E' : level > 20 ? '#EAB308' : '#EF4444';

  let displayTemp = temperature;
  if (temperatureUnit === 'F') {
    displayTemp = (temperature * 9 / 5) + 32;
  }
  displayTemp = Math.round(displayTemp * 10) / 10;

  return (
    <div className={`${theme.cardBg} border ${theme.border} rounded-xl p-6 hover:border-[#3E6AE1]/50 transition-all duration-300`} data-testid="battery-health-card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {charging ? (
            <BatteryCharging className="w-5 h-5" style={{ color: batteryColor }} data-testid="battery-charging-icon" />
          ) : (
            <Battery className="w-5 h-5" style={{ color: batteryColor }} data-testid="battery-icon" />
          )}
          <h3 className={`text-lg font-semibold ${theme.text}`}>Battery Health</h3>
        </div>
        <span className={`text-sm ${theme.subText} uppercase tracking-wider`} data-testid="battery-status">
          {charging ? 'Charging' : 'Ready'}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div data-testid="battery-level">
          <p className={`text-sm ${theme.subText} mb-1`}>Charge Level</p>
          <p className="text-3xl font-bold" style={{ color: batteryColor }}>{level}%</p>
        </div>
        <div data-testid="battery-health">
          <p className={`text-sm ${theme.subText} mb-1`}>Health</p>
          <p className={`text-3xl font-bold ${theme.text}`}>{health}%</p>
        </div>
      </div>

      <div className="h-32 mb-4" data-testid="battery-chart">
        <Line data={chartData} options={chartOptions} />
      </div>

      <div className={`grid grid-cols-2 gap-4 pt-4 border-t ${theme.grid}`}>
        <div data-testid="battery-voltage">
          <p className={`text-xs ${theme.subText} mb-1 flex items-center gap-1`}>
            <Zap className="w-3 h-3" />
            Voltage
          </p>
          <p className={`text-sm font-medium ${theme.text}`}>{voltage}V</p>
        </div>
        <div data-testid="battery-temperature">
          <p className={`text-xs ${theme.subText} mb-1`}>Temperature</p>
          <p className={`text-sm font-medium ${theme.text}`}>{displayTemp}°{temperatureUnit}</p>
        </div>
      </div>
    </div>
  );
};

export default BatteryHealthCard;