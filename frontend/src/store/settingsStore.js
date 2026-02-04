import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useSettingsStore = create(
    persist(
        (set) => ({
            darkMode: true,
            compactMode: false,
            distanceUnit: 'mi', // 'km' or 'mi'
            temperatureUnit: 'F', // 'C' or 'F'

            setDarkMode: (isDark) => set({ darkMode: isDark }),
            setCompactMode: (isCompact) => set({ compactMode: isCompact }),
            setDistanceUnit: (unit) => set({ distanceUnit: unit }),
            setTemperatureUnit: (unit) => set({ temperatureUnit: unit }),
        }),
        {
            name: 'vehicle-dashboard-settings', // unique name for localStorage
        }
    )
);

export default useSettingsStore;
