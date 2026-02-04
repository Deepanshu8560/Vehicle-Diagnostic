import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, LayoutDashboard, Zap, BarChart2, Settings, X, ChevronRight } from 'lucide-react';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetClose,
} from "./ui/sheet";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, LayoutDashboard, Zap, BarChart2, Settings, X, ChevronRight } from 'lucide-react';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "./ui/sheet";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import useSettingsStore from '../store/settingsStore';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { darkMode } = useSettingsStore();

    const theme = {
        sheetBg: darkMode ? 'bg-[#050505]' : 'bg-white',
        text: darkMode ? 'text-white' : 'text-gray-900',
        subText: darkMode ? 'text-[#A1A1AA]' : 'text-gray-500',
        border: darkMode ? 'border-white/10' : 'border-gray-200',
        hoverBg: darkMode ? 'hover:bg-white/5' : 'hover:bg-gray-100',
        hoverText: darkMode ? 'hover:text-white' : 'hover:text-gray-900',
        separator: darkMode ? 'bg-white/10' : 'bg-gray-200',
        triggerText: darkMode ? 'text-[#A1A1AA] hover:text-white hover:bg-white/10' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100',
        activeBg: darkMode ? 'bg-[#3E6AE1]/20' : 'bg-[#3E6AE1]/10',
    };

    // Navigation items configuration
    const navItems = [
        {
            path: '/',
            label: 'Dashboard',
            icon: <LayoutDashboard className="h-5 w-5" />,
            description: 'Real-time vehicle overview'
        },
        {
            path: '/energy',
            label: 'Energy',
            icon: <Zap className="h-5 w-5" />,
            description: 'Power consumption stats'
        },
        {
            path: '/analytics',
            label: 'Analytics',
            icon: <BarChart2 className="h-5 w-5" />,
            description: 'Historical data & logs'
        },
        {
            path: '/settings',
            label: 'Settings',
            icon: <Settings className="h-5 w-5" />,
            description: 'App configuration'
        },
    ];

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className={theme.triggerText}
                    aria-label="Open menu"
                >
                    <Menu className="h-6 w-6" />
                </Button>
            </SheetTrigger>
            <SheetContent side="right" className={`w-[300px] border-l ${theme.border} ${theme.sheetBg} ${theme.text} p-0`}>
                <SheetHeader className="p-6 pb-2 text-left">
                    <SheetTitle className={`text-xl font-bold ${theme.text} flex items-center justify-between`}>
                        Menu
                        {/* Close button is handled by Sheet primitive, but we can add explicit close behavior if needed */}
                    </SheetTitle>
                </SheetHeader>

                <Separator className={`${theme.separator} my-4`} />

                <nav className="flex flex-col gap-2 px-4">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            onClick={() => setIsOpen(false)}
                            className={({ isActive }) =>
                                `group flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 
                ${isActive
                                    ? `${theme.activeBg} text-[#3E6AE1]`
                                    : `${theme.subText} ${theme.hoverBg} ${theme.hoverText}`
                                }`
                            }
                        >
                            <div className="flex-shrink-0 transition-colors group-hover:text-current">
                                {item.icon}
                            </div>
                            <div className="flex-1">
                                <span className="block font-medium">{item.label}</span>
                                <span className={`text-xs opacity-40 group-hover:opacity-60 transition-opacity`}>
                                    {item.description}
                                </span>
                            </div>
                            {/* Active indicator */}
                            <div className="opacity-0 group-[.active]:opacity-100 transition-opacity">
                                <ChevronRight className="h-4 w-4" />
                            </div>
                        </NavLink>
                    ))}
                </nav>

                <div className="absolute bottom-8 left-0 right-0 px-8 text-center">
                    <p className="text-xs opacity-20">
                        Vehicle Diagnostics v1.0.0
                    </p>
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default Sidebar;
