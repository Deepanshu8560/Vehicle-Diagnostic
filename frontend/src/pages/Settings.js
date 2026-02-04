import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Label } from "../components/ui/label";
import { Switch } from "../components/ui/switch";
import { Button } from "../components/ui/button";
import useSettingsStore from '../store/settingsStore';

const Settings = () => {
    const {
        darkMode,
        compactMode,
        distanceUnit,
        temperatureUnit,
        setDarkMode,
        setCompactMode,
        setDistanceUnit,
        setTemperatureUnit
    } = useSettingsStore();

    const theme = {
        cardBg: darkMode ? 'bg-[#18181B]' : 'bg-white',
        border: darkMode ? 'border-white/10' : 'border-gray-200',
        text: darkMode ? 'text-white' : 'text-gray-900',
        subText: darkMode ? 'text-white/50' : 'text-gray-500',
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className={`text-3xl font-bold tracking-tight ${theme.text}`}>Settings</h2>
            </div>

            <Card className={`${theme.cardBg} ${theme.border} ${theme.text}`}>
                <CardHeader>
                    <CardTitle>Appearance & Display</CardTitle>
                    <CardDescription className={theme.subText}>Customize how the dashboard looks and behaves.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label className="text-base">Dark Mode</Label>
                            <p className={`text-sm ${theme.subText}`}>
                                Always use dark theme for dashboard
                            </p>
                        </div>
                        <Switch
                            checked={darkMode}
                            onCheckedChange={setDarkMode}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label className="text-base">Compact Mode</Label>
                            <p className={`text-sm ${theme.subText}`}>
                                Decrease spacing to show more data
                            </p>
                        </div>
                        <Switch
                            checked={compactMode}
                            onCheckedChange={setCompactMode}
                        />
                    </div>
                </CardContent>
            </Card>

            <Card className={`${theme.cardBg} ${theme.border} ${theme.text}`}>
                <CardHeader>
                    <CardTitle>Units & Measurements</CardTitle>
                    <CardDescription className={theme.subText}>Configure your preferred units of measurement.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label className="text-base">Distance Units</Label>
                            <p className={`text-sm ${theme.subText}`}>
                                Toggle between Kilometers (km) and Miles (mi)
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className={`text-sm ${distanceUnit === 'mi' ? theme.text : theme.subText}`}>Miles</span>
                            <Switch
                                checked={distanceUnit === 'km'}
                                onCheckedChange={(checked) => setDistanceUnit(checked ? 'km' : 'mi')}
                            />
                            <span className={`text-sm ${distanceUnit === 'km' ? theme.text : theme.subText}`}>Km</span>
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label className="text-base">Temperature</Label>
                            <p className={`text-sm ${theme.subText}`}>
                                Toggle between Celsius (°C) and Fahrenheit (°F)
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className={`text-sm ${temperatureUnit === 'F' ? theme.text : theme.subText}`}>°F</span>
                            <Switch
                                checked={temperatureUnit === 'C'}
                                onCheckedChange={(checked) => setTemperatureUnit(checked ? 'C' : 'F')}
                            />
                            <span className={`text-sm ${temperatureUnit === 'C' ? theme.text : theme.subText}`}>°C</span>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="flex justify-end">
                <Button className="bg-[#3E6AE1] hover:bg-[#3E6AE1]/90">
                    Save Changes
                </Button>
            </div>
        </div>
    );
};

export default Settings;
