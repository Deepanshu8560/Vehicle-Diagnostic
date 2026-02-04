import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import useVehicleStore from '@/store/vehicleStore';
import useSettingsStore from '@/store/settingsStore';
import useSettingsStore from '@/store/settingsStore';

const VehicleSelector = () => {
  const { vehicles, selectedVehicle, setSelectedVehicle } = useVehicleStore();
  const { darkMode } = useSettingsStore();

  const theme = {
    triggerBg: darkMode ? 'bg-[#1A1A1A] hover:bg-[#252525]' : 'bg-white hover:bg-gray-100',
    border: darkMode ? 'border-white/10' : 'border-gray-200',
    text: darkMode ? 'text-white' : 'text-gray-900',
    contentBg: darkMode ? 'bg-[#1A1A1A]' : 'bg-white',
    itemFocus: darkMode ? 'focus:bg-[#252525] focus:text-white' : 'focus:bg-gray-100 focus:text-gray-900',
  };

  const handleValueChange = (vehicleId) => {
    const vehicle = vehicles.find(v => v.id === vehicleId);
    if (vehicle) {
      setSelectedVehicle(vehicle);
    }
  };

  return (
    <div className="w-full max-w-xs" data-testid="vehicle-selector-container">
      <Select
        value={selectedVehicle?.id || ''}
        onValueChange={handleValueChange}
      >
        <SelectTrigger
          className={`w-full ${theme.triggerBg} ${theme.border} ${theme.text} transition-colors`}
          data-testid="vehicle-selector-trigger"
        >
          <SelectValue placeholder="Select a vehicle" />
        </SelectTrigger>
        <SelectContent
          className={`${theme.contentBg} ${theme.border} ${theme.text}`}
          data-testid="vehicle-selector-content"
        >
          {vehicles.map((vehicle) => (
            <SelectItem
              key={vehicle.id}
              value={vehicle.id}
              className={`${theme.itemFocus} cursor-pointer`}
              data-testid={`vehicle-option-${vehicle.id}`}
            >
              {vehicle.name} - {vehicle.color}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default VehicleSelector;