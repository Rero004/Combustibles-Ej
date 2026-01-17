"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MapWrapper from "@/components/MapWrapper";
import { MOCK_UNITS, Unit } from "@/lib/mockData";
import { Plus, Search, Filter, Truck, FileText, X, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export default function MonitoringPage() {
    const [units, setUnits] = useState<Unit[]>(MOCK_UNITS);
    const [selectedStatus, setSelectedStatus] = useState<string | 'All'>('All');
    const [showAddModal, setShowAddModal] = useState(false);
    const [newUnit, setNewUnit] = useState<Partial<Unit>>({});

    const filteredUnits = selectedStatus === 'All'
        ? units
        : units.filter(u => u.status === selectedStatus);

    const handleAddUnit = (e: React.FormEvent) => {
        e.preventDefault();
        const unitToAdd: Unit = {
            id: `U-${Math.floor(Math.random() * 1000)}`,
            name: newUnit.name || 'Nueva Unidad',
            line: newUnit.line || '',
            fuelType: (newUnit.fuelType as any) || 'Diesel',
            status: 'Esperando Carga',
            capacity: newUnit.capacity || 30000,
            location: { lat: 20.6, lng: -100.4 }, // Default mock location
            driver: newUnit.driver || 'Sin Asignar',
            lastUpdate: 'Ahora'
        };
        setUnits([...units, unitToAdd]);
        setShowAddModal(false);
        setNewUnit({});
    };

    return (
        <div className="h-[calc(100vh-100px)] flex flex-col gap-4">
            {/* Header & Controls */}
            <div className="flex justify-between items-center bg-card/50 p-4 rounded-xl border border-white/5 backdrop-blur-sm">
                <div className="flex items-center gap-4">
                    <h1 className="text-2xl font-bold text-white">Centro de Monitoreo</h1>
                    <div className="flex items-center gap-2 bg-black/20 p-1 rounded-lg border border-white/5">
                        {['All', 'En Transito', 'Detenida', 'En Descarga'].map(status => (
                            <button
                                key={status}
                                onClick={() => setSelectedStatus(status)}
                                className={cn(
                                    "px-3 py-1.5 rounded-md text-sm transition-all",
                                    selectedStatus === status
                                        ? "bg-primary text-white shadow-lg"
                                        : "text-gray-400 hover:text-white"
                                )}
                            >
                                {status === 'All' ? 'Todas' : status}
                            </button>
                        ))}
                    </div>
                </div>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="bg-primary hover:bg-primary/80 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all shadow-lg shadow-primary/20"
                >
                    <Plus className="w-4 h-4" />
                    <span>Agregar Unidad</span>
                </button>
            </div>

            {/* Main Content Split View */}
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 min-h-0">
                {/* Map View */}
                <div className="w-full h-full bg-card/50 rounded-xl border border-white/5 overflow-hidden shadow-2xl relative">
                    <MapWrapper units={filteredUnits} />

                    {/* Overlay Stats */}
                    <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md p-4 rounded-xl border border-white/10 z-[400]">
                        <h4 className="text-gray-400 text-xs uppercase mb-2">Unidades Activas</h4>
                        <div className="text-3xl font-bold text-white">{filteredUnits.length}</div>
                    </div>
                </div>

                {/* Table View */}
                <div className="w-full h-full bg-card/50 rounded-xl border border-white/5 overflow-hidden flex flex-col backdrop-blur-sm">
                    <div className="p-4 border-b border-white/5 flex gap-2">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                            <input
                                type="text"
                                placeholder="Buscar unidad, chofer, linea..."
                                className="w-full bg-black/20 border border-white/10 rounded-lg py-2 pl-9 pr-4 text-sm text-white focus:outline-none focus:border-primary/50"
                            />
                        </div>
                    </div>

                    <div className="flex-1 overflow-auto p-2">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-white/5 sticky top-0 backdrop-blur-md">
                                <tr>
                                    <th className="p-3 text-xs font-semibold text-gray-400">Unidad</th>
                                    <th className="p-3 text-xs font-semibold text-gray-400">Estatus</th>
                                    <th className="p-3 text-xs font-semibold text-gray-400">Producto</th>
                                    <th className="p-3 text-xs font-semibold text-gray-400">Evidencia</th>
                                    <th className="p-3 text-xs font-semibold text-gray-400">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {filteredUnits.map((unit) => (
                                    <tr key={unit.id} className="hover:bg-white/5 transition-colors group">
                                        <td className="p-3">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
                                                    <Truck className="w-4 h-4" />
                                                </div>
                                                <div>
                                                    <div className="font-medium text-white">{unit.name}</div>
                                                    <div className="text-xs text-gray-500">{unit.line}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-3">
                                            <span className={cn(
                                                "px-2 py-1 rounded-full text-xs font-medium border",
                                                unit.status === 'En Transito' ? "bg-green-500/10 text-green-400 border-green-500/20" :
                                                    unit.status === 'Detenida' ? "bg-red-500/10 text-red-400 border-red-500/20" :
                                                        unit.status === 'En Descarga' ? "bg-blue-500/10 text-blue-400 border-blue-500/20" :
                                                            "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                                            )}>
                                                {unit.status}
                                            </span>
                                        </td>
                                        <td className="p-3 text-sm text-gray-300">{unit.fuelType}</td>
                                        <td className="p-3">
                                            <button className="text-xs flex items-center gap-1 text-primary hover:text-primary/80 transition-colors">
                                                <FileText className="w-3 h-3" />
                                                Ver PDF
                                            </button>
                                        </td>
                                        <td className="p-3">
                                            <button className="text-gray-500 hover:text-white transition-colors">...</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Add Unit Modal */}
            <AnimatePresence>
                {showAddModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-[#0f0f1a] border border-white/10 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl"
                        >
                            <div className="p-6 border-b border-white/10 flex justify-between items-center">
                                <h2 className="text-xl font-bold text-white">Agregar Nueva Unidad</h2>
                                <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-white transition-colors">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <form onSubmit={handleAddUnit} className="p-6 space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm text-gray-400">Nombre de Unidad</label>
                                    <input
                                        required
                                        value={newUnit.name || ''}
                                        onChange={e => setNewUnit({ ...newUnit, name: e.target.value })}
                                        className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:border-primary transition-colors"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400">Línea</label>
                                        <input
                                            required
                                            value={newUnit.line || ''}
                                            onChange={e => setNewUnit({ ...newUnit, line: e.target.value })}
                                            className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:border-primary transition-colors"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400">Capacidad (Lts)</label>
                                        <input
                                            type="number"
                                            required
                                            value={newUnit.capacity || ''}
                                            onChange={e => setNewUnit({ ...newUnit, capacity: parseInt(e.target.value) })}
                                            className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:border-primary transition-colors"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm text-gray-400">Chofer</label>
                                    <input
                                        value={newUnit.driver || ''}
                                        onChange={e => setNewUnit({ ...newUnit, driver: e.target.value })}
                                        className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:border-primary transition-colors"
                                    />
                                </div>

                                <div className="pt-4 flex justify-end gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setShowAddModal(false)}
                                        className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-primary hover:bg-primary/80 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                                    >
                                        Guardar Unidad
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
