import { CircleAlert } from 'lucide-react';
import * as d3 from 'd3';
import { useEffect, useRef } from 'react';
import useSettingsStore from '../store/settingsStore';

const TirePressureCard = ({ diagnostics }) => {
  const svgRef = useRef(null);
  const { temperatureUnit, darkMode } = useSettingsStore();

  const theme = {
    cardBg: darkMode ? 'bg-[#121212]' : 'bg-white',
    border: darkMode ? 'border-white/10' : 'border-gray-200',
    text: darkMode ? 'text-white' : 'text-gray-900',
    subText: darkMode ? 'text-[#A1A1AA]' : 'text-gray-500',
    innerBg: darkMode ? 'bg-[#1A1A1A]' : 'bg-gray-50',
    grid: darkMode ? 'border-white/10' : 'border-gray-200',
  };

  useEffect(() => {
    if (diagnostics?.tires && svgRef.current) {
      const { front_left, front_right, rear_left, rear_right } = diagnostics.tires;
      const tires = [
        { label: 'FL', value: front_left, x: 25, y: 25 },
        { label: 'FR', value: front_right, x: 75, y: 25 },
        { label: 'RL', value: rear_left, x: 25, y: 75 },
        { label: 'RR', value: rear_right, x: 75, y: 75 },
      ];

      const svg = d3.select(svgRef.current);
      svg.selectAll('*').remove();

      const width = 200;
      const height = 150;

      svg.attr('viewBox', `0 0 100 100`)
        .attr('preserveAspectRatio', 'xMidYMid meet');

      // Car body
      svg.append('rect')
        .attr('x', 35)
        .attr('y', 35)
        .attr('width', 30)
        .attr('height', 30)
        .attr('rx', 4)
        .attr('fill', 'none')
        .attr('stroke', '#3E6AE1')
        .attr('stroke-width', 0.5)
        .attr('opacity', 0.3);

      // Tire indicators
      tires.forEach(tire => {
        const isNormal = tire.value >= 32 && tire.value <= 38;
        const color = isNormal ? '#22C55E' : '#EAB308';

        const group = svg.append('g');

        // Tire circle
        group.append('circle')
          .attr('cx', tire.x)
          .attr('cy', tire.y)
          .attr('r', 8)
          .attr('fill', color)
          .attr('opacity', 0.2)
          .attr('stroke', color)
          .attr('stroke-width', 1.5);

        // Value text
        group.append('text')
          .attr('x', tire.x)
          .attr('y', tire.y + 1)
          .attr('text-anchor', 'middle')
          .attr('dominant-baseline', 'middle')
          .attr('fill', darkMode ? '#FFFFFF' : '#111827')
          .attr('font-size', '5')
          .attr('font-weight', 'bold')
          .text(tire.value);

        // Label
        group.append('text')
          .attr('x', tire.x)
          .attr('y', tire.y + 15)
          .attr('text-anchor', 'middle')
          .attr('fill', darkMode ? '#A1A1AA' : '#6B7280')
          .attr('font-size', '4')
          .text(tire.label);
      });
    }
  }, [diagnostics, darkMode]);

  if (!diagnostics?.tires) {
    return (
      <div className={`${theme.cardBg} border ${theme.border} rounded-xl p-6 animate-pulse`} data-testid="tire-card-loading">
        <div className="h-6 bg-white/10 rounded w-1/2 mb-4"></div>
        <div className="h-40 bg-white/10 rounded"></div>
      </div>
    );
  }

  const { front_left, front_right, rear_left, rear_right, temperature_avg } = diagnostics.tires;
  const allNormal = [front_left, front_right, rear_left, rear_right].every(p => p >= 32 && p <= 38);

  let displayTemp = temperature_avg;
  if (temperatureUnit === 'F') {
    displayTemp = (temperature_avg * 9 / 5) + 32;
  }
  displayTemp = Math.round(displayTemp * 10) / 10;

  return (
    <div className={`${theme.cardBg} border ${theme.border} rounded-xl p-6 hover:border-[#3E6AE1]/50 transition-all duration-300`} data-testid="tire-pressure-card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <CircleAlert className="w-5 h-5 text-[#3E6AE1]" data-testid="tire-icon" />
          <h3 className={`text-lg font-semibold ${theme.text}`}>Tire Pressure</h3>
        </div>
        <span
          className="text-xs px-2 py-1 rounded-full"
          style={{
            backgroundColor: allNormal ? '#22C55E20' : '#EAB30820',
            color: allNormal ? '#22C55E' : '#EAB308'
          }}
          data-testid="tire-status"
        >
          {allNormal ? 'All Normal' : 'Check'}
        </span>
      </div>

      {/* D3 Visualization */}
      <div className="flex justify-center mb-4" data-testid="tire-visualization">
        <svg ref={svgRef} className="w-full max-w-[200px] h-40"></svg>
      </div>

      {/* Pressure details */}
      <div className="grid grid-cols-2 gap-3">
        <div className={`${theme.innerBg} rounded-lg p-3`} data-testid="tire-front-left">
          <p className={`text-xs ${theme.subText} mb-1`}>Front Left</p>
          <p className={`text-lg font-bold ${theme.text}`}>{front_left} PSI</p>
        </div>
        <div className={`${theme.innerBg} rounded-lg p-3`} data-testid="tire-front-right">
          <p className={`text-xs ${theme.subText} mb-1`}>Front Right</p>
          <p className={`text-lg font-bold ${theme.text}`}>{front_right} PSI</p>
        </div>
        <div className={`${theme.innerBg} rounded-lg p-3`} data-testid="tire-rear-left">
          <p className={`text-xs ${theme.subText} mb-1`}>Rear Left</p>
          <p className={`text-lg font-bold ${theme.text}`}>{rear_left} PSI</p>
        </div>
        <div className={`${theme.innerBg} rounded-lg p-3`} data-testid="tire-rear-right">
          <p className={`text-xs ${theme.subText} mb-1`}>Rear Right</p>
          <p className={`text-lg font-bold ${theme.text}`}>{rear_right} PSI</p>
        </div>
      </div>

      <div className={`mt-4 pt-4 border-t ${theme.grid}`} data-testid="tire-temp">
        <div className="flex justify-between items-center">
          <span className={`text-sm ${theme.subText}`}>Avg Temperature</span>
          <span className={`text-sm font-medium ${theme.text}`}>{displayTemp}°{temperatureUnit}</span>
        </div>
      </div>
    </div>
  );
};

export default TirePressureCard;