"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MOCK_SALES, Sale, MOCK_UNITS } from "@/lib/mockData";
import { Truck, DollarSign, BarChart3, Clock, Search, Filter, Plus, FileText, CheckCircle2, ChevronRight, Droplets } from "lucide-react";
import { cn } from "@/lib/utils";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, Legend } from 'recharts';

// Data for Charts
const MERMA_DATA = [
    { name: 'T-Norte', merma: 120, total: 50000 },
    { name: 'Log-Exp', merma: 80, total: 45000 },
    { name: 'T-Bajio', merma: 200, total: 60000 },
    { name: 'G-Express', merma: 50, total: 30000 },
];

const CYCLE_TIME_DATA = [
    { stage: 'Contratación', time: 1 },
    { stage: 'Asignación', time: 0.5 },
    { stage: 'Carga', time: 1 },
    { stage: 'Tránsito', time: 2 },
    { stage: 'Descarga', time: 1 },
    { stage: 'Facturación', time: 1 },
    { stage: 'Cobro', time: 15 },
];

export default function OperationsPage() {
    const [activeTab, setActiveTab] = useState<'asignacion' | 'fletes' | 'costos'>('asignacion');

    return (
        <div className="space-y-6">
            {/* Header & Tabs */}
            <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white">Gestión Operativa</h1>
                    <p className="text-muted-foreground">Control de Cargas, Fletes y Costos</p>
                </div>

                <div className="bg-white/5 p-1 rounded-xl border border-white/5 flex gap-1">
                    <TabButton active={activeTab === 'asignacion'} onClick={() => setActiveTab('asignacion')} icon={Truck} label="Asignación Cargas" />
                    <TabButton active={activeTab === 'fletes'} onClick={() => setActiveTab('fletes')} icon={BarChart3} label="Dashboard Fletes" />
                    <TabButton active={activeTab === 'costos'} onClick={() => setActiveTab('costos')} icon={DollarSign} label="Costos" />
                </div>
            </div>

            {/* Content Area */}
            <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="min-h-[500px]"
            >
                {activeTab === 'asignacion' && <AsignacionView />}
                {activeTab === 'fletes' && <FletesDashboard />}
                {activeTab === 'costos' && <CostosView />}
            </motion.div>
        </div>
    );
}

function TabButton({ active, onClick, icon: Icon, label }: any) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
                active ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-gray-400 hover:text-white hover:bg-white/5"
            )}
        >
            <Icon className="w-4 h-4" />
            <span className="hidden sm:inline">{label}</span>
        </button>
    );
}

function AsignacionView() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Credit Providers */}
            <div className="lg:col-span-3 bg-gradient-to-r from-blue-900/20 to-primary/10 rounded-xl p-6 border border-white/5 flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-bold text-white mb-1">Crédito Disponible</h3>
                    <div className="flex gap-8">
                        <div>
                            <span className="text-xs text-gray-400 block">Pemex Refinación</span>
                            <span className="text-xl font-mono text-green-400">$2,450,000 MXN</span>
                        </div>
                        <div>
                            <span className="text-xs text-gray-400 block">Valero Terminals</span>
                            <span className="text-xl font-mono text-yellow-400">$850,000 MXN</span>
                        </div>
                    </div>
                </div>
                <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                    Ver Detalles
                </button>
            </div>

            {/* Pending Sales List */}
            <div className="lg:col-span-2 space-y-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Clock className="text-orange-400 w-5 h-5" />
                    Ventas Pendientes de Asignar
                </h3>

                <div className="space-y-3">
                    {MOCK_SALES.filter(s => s.status === 'Pendiente Asignacion').map((sale) => (
                        <div key={sale.id} className="bg-card/50 border border-white/5 rounded-xl p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-primary/50 transition-colors group">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="font-bold text-white">{sale.client}</span>
                                    <span className={cn(
                                        "px-2 py-0.5 rounded text-[10px] uppercase font-bold border",
                                        sale.product === 'Diesel' ? "bg-black text-gray-300 border-gray-600" :
                                            sale.product === 'Magna' ? "bg-green-900/30 text-green-400 border-green-800" :
                                                "bg-red-900/30 text-red-400 border-red-800"
                                    )}>{sale.product}</span>
                                </div>
                                <div className="flex gap-4 text-sm text-gray-400">
                                    <span>{sale.quantity.toLocaleString()} L</span>
                                    <span>•</span>
                                    <span>{sale.destination}</span>
                                    <span>•</span>
                                    <span>Vendedor: {sale.seller}</span>
                                </div>
                            </div>

                            <div className="text-right">
                                <div className="text-lg font-bold text-white">${sale.price.toFixed(2)} <span className="text-xs font-normal text-gray-500">/L</span></div>
                                <button className="mt-2 text-xs bg-primary hover:bg-primary/80 text-white px-3 py-1.5 rounded-md flex items-center gap-1 transition-colors">
                                    Asignar Carga <ChevronRight className="w-3 h-3" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Available Units Panel */}
            <div className="bg-card/30 border border-white/5 rounded-xl p-4 h-fit">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <Truck className="text-blue-400 w-5 h-5" />
                    Unidades Disponibles
                </h3>
                <div className="space-y-2">
                    {MOCK_UNITS.filter(u => u.status === 'Esperando Carga').map(unit => (
                        <div key={unit.id} className="p-3 bg-white/5 rounded-lg border border-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                            <div className="flex justify-between mb-1">
                                <span className="font-medium text-white">{unit.name}</span>
                                <span className="text-xs text-green-400">Disponible</span>
                            </div>
                            <div className="text-xs text-gray-400">
                                {unit.capacity.toLocaleString()} L • {unit.line}
                            </div>
                            <div className="mt-2 text-xs text-blue-300">
                                Costo Flete Est.: $0.85/L
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function FletesDashboard() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Merma Chart */}
            <div className="bg-card/50 p-6 rounded-xl border border-white/5">
                <h3 className="text-lg font-bold text-white mb-6">Mermas por Línea (Litros)</h3>
                <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={MERMA_DATA}>
                            <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                            <XAxis dataKey="name" stroke="#6b7280" />
                            <YAxis stroke="#6b7280" />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#111', borderColor: '#333', color: '#fff' }}
                                cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                            />
                            <Bar dataKey="merma" fill="#ef4444" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Cycle Time Chart */}
            <div className="bg-card/50 p-6 rounded-xl border border-white/5">
                <h3 className="text-lg font-bold text-white mb-6">Tiempos de Ciclo (Días)</h3>
                <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={CYCLE_TIME_DATA} layout="horizontal">
                            <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                            <XAxis dataKey="stage" stroke="#6b7280" fontSize={10} />
                            <YAxis stroke="#6b7280" />
                            <Tooltip contentStyle={{ backgroundColor: '#111', borderColor: '#333', color: '#fff' }} />
                            <Area type="monotone" dataKey="time" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.2} />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}

function CostosView() {
    return (
        <div className="space-y-6">
            <div className="bg-card/50 p-6 rounded-xl border border-white/5">
                <div className="flex gap-4 mb-6">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input className="w-full bg-black/20 border border-white/10 rounded-lg py-2 pl-9 pr-4 text-white placeholder:text-gray-500 focus:border-primary" placeholder="Buscar origen, destino o línea..." />
                    </div>
                    <button className="bg-primary hover:bg-primary/80 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium">
                        <Plus className="w-4 h-4" />
                        Nueva Cotización
                    </button>
                </div>

                <table className="w-full text-left border-collapse">
                    <thead className="bg-white/5">
                        <tr>
                            <th className="p-3 text-xs font-semibold text-gray-400">Origen</th>
                            <th className="p-3 text-xs font-semibold text-gray-400">Destino</th>
                            <th className="p-3 text-xs font-semibold text-gray-400">Línea</th>
                            <th className="p-3 text-xs font-semibold text-gray-400">Capacidad</th>
                            <th className="p-3 text-xs font-semibold text-gray-400 text-right">Costo Total</th>
                            <th className="p-3 text-xs font-semibold text-gray-400 text-right">Costo / Lt</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        <tr className="hover:bg-white/5 transition-colors">
                            <td className="p-3 text-white">Tula, Hgo</td>
                            <td className="p-3 text-white">Querétaro, Qro</td>
                            <td className="p-3 text-gray-300">Transportes Del Norte</td>
                            <td className="p-3 text-gray-300">65,000 L</td>
                            <td className="p-3 text-white font-mono text-right">$45,500</td>
                            <td className="p-3 text-green-400 font-mono text-right font-bold">$0.70</td>
                        </tr>
                        <tr className="hover:bg-white/5 transition-colors">
                            <td className="p-3 text-white">Cadereyta, NL</td>
                            <td className="p-3 text-white">Saltillo, Coah</td>
                            <td className="p-3 text-gray-300">Logistica Express</td>
                            <td className="p-3 text-gray-300">30,000 L</td>
                            <td className="p-3 text-white font-mono text-right">$28,000</td>
                            <td className="p-3 text-green-400 font-mono text-right font-bold">$0.93</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}
