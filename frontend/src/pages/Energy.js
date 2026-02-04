import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Zap, Battery, Activity } from "lucide-react";

const Energy = () => {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Energy Monitor</h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card className="bg-[#18181B] border-white/10 text-white">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Current Consumption
                        </CardTitle>
                        <Zap className="h-4 w-4 text-emerald-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">18.2 kWh/100km</div>
                        <p className="text-xs text-white/50">
                            -2.1% from average
                        </p>
                    </CardContent>
                </Card>

                <Card className="bg-[#18181B] border-white/10 text-white">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Regenerated
                        </CardTitle>
                        <Battery className="h-4 w-4 text-emerald-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">4.5 kWh</div>
                        <p className="text-xs text-white/50">
                            Total this trip
                        </p>
                    </CardContent>
                </Card>

                <Card className="bg-[#18181B] border-white/10 text-white">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Projected Range
                        </CardTitle>
                        <Activity className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">342 km</div>
                        <p className="text-xs text-white/50">
                            Based on current usage
                        </p>
                    </CardContent>
                </Card>
            </div>

            <Card className="bg-[#18181B] border-white/10 text-white">
                <CardHeader>
                    <CardTitle>Consumption Graph</CardTitle>
                </CardHeader>
                <CardContent className="h-[300px] flex items-center justify-center border-t border-white/10">
                    <div className="text-center text-white/30">
                        <Activity className="h-12 w-12 mx-auto mb-2 opacity-50" />
                        <p>Real-time energy graph visualization will appear here</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Energy;
