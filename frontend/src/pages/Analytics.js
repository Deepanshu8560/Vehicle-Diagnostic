import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Badge } from "../components/ui/badge";

const Analytics = () => {
    const trips = [
        { id: 1, date: '2024-03-10', distance: '45.2 km', duration: '42 min', efficiency: '178 Wh/km', status: 'Completed' },
        { id: 2, date: '2024-03-09', distance: '12.8 km', duration: '15 min', efficiency: '192 Wh/km', status: 'Completed' },
        { id: 3, date: '2024-03-08', distance: '124.5 km', duration: '1h 35m', efficiency: '165 Wh/km', status: 'Completed' },
        { id: 4, date: '2024-03-08', distance: '5.2 km', duration: '12 min', efficiency: '210 Wh/km', status: 'Short Trip' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Trip Analytics</h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <Card className="bg-[#18181B] border-white/10 text-white">
                    <CardHeader>
                        <CardTitle>Weekly Efficiency</CardTitle>
                        <CardDescription className="text-white/50">Average energy consumption per day</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[200px] flex items-center justify-center">
                        <p className="text-white/30 italic">Efficiency Chart Placeholder</p>
                    </CardContent>
                </Card>

                <Card className="bg-[#18181B] border-white/10 text-white">
                    <CardHeader>
                        <CardTitle>Distance Traveled</CardTitle>
                        <CardDescription className="text-white/50">Total kilometers over last 30 days</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[200px] flex items-center justify-center">
                        <p className="text-white/30 italic">Distance Chart Placeholder</p>
                    </CardContent>
                </Card>
            </div>

            <Card className="bg-[#18181B] border-white/10 text-white">
                <CardHeader>
                    <CardTitle>Recent Trips</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow className="border-white/10 hover:bg-white/5">
                                <TableHead className="text-white/70">Date</TableHead>
                                <TableHead className="text-white/70">Distance</TableHead>
                                <TableHead className="text-white/70">Duration</TableHead>
                                <TableHead className="text-white/70">Efficiency</TableHead>
                                <TableHead className="text-white/70">Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {trips.map((trip) => (
                                <TableRow key={trip.id} className="border-white/10 hover:bg-white/5">
                                    <TableCell className="font-medium">{trip.date}</TableCell>
                                    <TableCell>{trip.distance}</TableCell>
                                    <TableCell>{trip.duration}</TableCell>
                                    <TableCell>{trip.efficiency}</TableCell>
                                    <TableCell>
                                        <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 border-0">
                                            {trip.status}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
};

export default Analytics;
