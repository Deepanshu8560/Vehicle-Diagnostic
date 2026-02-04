import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import useVehicleStore from '@/store/vehicleStore';

const VehicleSelector = () => {
  const { vehicles, selectedVehicle, setSelectedVehicle } = useVehicleStore();

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
          className="w-full bg-[#1A1A1A] border-white/10 text-white hover:bg-[#252525] transition-colors"
          data-testid="vehicle-selector-trigger"
        >
          <SelectValue placeholder="Select a vehicle" />
        </SelectTrigger>
        <SelectContent 
          className="bg-[#1A1A1A] border-white/10 text-white"
          data-testid="vehicle-selector-content"
        >
          {vehicles.map((vehicle) => (
            <SelectItem 
              key={vehicle.id} 
              value={vehicle.id}
              className="hover:bg-[#252525] focus:bg-[#252525] cursor-pointer"
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