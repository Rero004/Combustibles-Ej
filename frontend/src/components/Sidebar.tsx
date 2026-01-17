"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Map, Truck, Receipt, Settings, LogOut, Fuel, MessageSquareText } from "lucide-react";
import { motion } from "framer-motion";

const sidebarItems = [
    { icon: LayoutDashboard, label: "Home", href: "/dashboard" },
    { icon: Map, label: "Monitoreo", href: "/monitoring" },
    { icon: Truck, label: "Operaciones", href: "/operations" },
    { icon: Receipt, label: "Facturación", href: "/billing" },
    { icon: MessageSquareText, label: "Asistente IA", href: "/ai-agent" },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="h-screen w-64 bg-[#0a0a14] border-r border-white/10 flex flex-col fixed left-0 top-0 z-50">
            <div className="p-6 flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-tr from-primary to-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-primary/20">
                    <Fuel className="text-white w-6 h-6" />
                </div>
                <div className="flex flex-col">
                    <span className="font-bold text-white text-lg leading-none">Combustibles</span>
                    <span className="text-xs text-muted-foreground">SA de CV</span>
                </div>
            </div>

            <nav className="flex-1 px-4 py-4 space-y-2">
                {sidebarItems.map((item) => {
                    const isActive = pathname.startsWith(item.href);
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden",
                                isActive
                                    ? "bg-primary/10 text-primary"
                                    : "text-gray-400 hover:text-white hover:bg-white/5"
                            )}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute inset-0 bg-primary/10 border-l-4 border-primary"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                />
                            )}
                            <Icon className={cn("w-5 h-5", isActive ? "text-primary" : "group-hover:text-white")} />
                            <span className="font-medium relative z-10">{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-white/10 space-y-2">
                <button className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl w-full text-left transition-all">
                    <Settings className="w-5 h-5" />
                    <span className="font-medium">Configuración</span>
                </button>
                <Link href="/login" className="flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl w-full text-left transition-all">
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Cerrar Sesión</span>
                </Link>
            </div>
        </div>
    );
}
