import { create } from 'zustand';

const useVehicleStore = create((set) => ({
  selectedVehicle: null,
  vehicles: [],
  diagnostics: null,
  loading: false,
  error: null,
  
  setSelectedVehicle: (vehicle) => set({ selectedVehicle: vehicle }),
  setVehicles: (vehicles) => set({ vehicles }),
  setDiagnostics: (diagnostics) => set({ diagnostics }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  
  reset: () => set({
    selectedVehicle: null,
    diagnostics: null,
    loading: false,
    error: null
  })
}));

export default useVehicleStore;