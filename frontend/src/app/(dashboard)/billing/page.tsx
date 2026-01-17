"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DollarSign, FileText, ChevronDown, ChevronRight, Download, CreditCard, Search, Check, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { MOCK_SALES, Sale } from "@/lib/mockData";

// Mock Data for Accounts Receivable
const ACCOUNTS_RECEIVABLE = [
    {
        seller: "Pedro Infante",
        totalDue: 1450000,
        clients: [
            {
                name: "Gasolineras SA",
                totalDue: 850000,
                invoices: [
                    { id: "FAC-001", amount: 450000, date: "2025-01-10", dueDays: 7, status: "Por Vencer" },
                    { id: "FAC-002", amount: 400000, date: "2025-01-05", dueDays: 12, status: "Vencida" },
                ]
            },
            {
                name: "Combustibles del Norte",
                totalDue: 600000,
                invoices: [
                    { id: "FAC-005", amount: 600000, date: "2025-01-12", dueDays: 5, status: "Al Corriente" },
                ]
            }
        ]
    },
    {
        seller: "Jose Alfredo",
        totalDue: 320000,
        clients: [
            {
                name: "Estaciones del Centro",
                totalDue: 320000,
                invoices: [
                    { id: "FAC-010", amount: 320000, date: "2025-01-15", dueDays: 2, status: "Al Corriente" },
                ]
            }
        ]
    }
];

export default function BillingPage() {
    const [activeTab, setActiveTab] = useState<'cobranza' | 'facturacion'>('cobranza');

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-white">Facturación y Cobranza</h1>
                    <p className="text-muted-foreground">Gestión de Cuentas por Cobrar y Facturación</p>
                </div>

                <div className="bg-white/5 p-1 rounded-xl border border-white/5 flex gap-1">
                    <button
                        onClick={() => setActiveTab('cobranza')}
                        className={cn(
                            "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
                            activeTab === 'cobranza' ? "bg-green-600 text-white shadow-lg shadow-green-600/20" : "text-gray-400 hover:text-white hover:bg-white/5"
                        )}
                    >
                        <DollarSign className="w-4 h-4" />
                        <span>Cuentas por Cobrar</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('facturacion')}
                        className={cn(
                            "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
                            activeTab === 'facturacion' ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-gray-400 hover:text-white hover:bg-white/5"
                        )}
                    >
                        <FileText className="w-4 h-4" />
                        <span>Pendiente de Facturar</span>
                    </button>
                </div>
            </div>

            <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
            >
                {activeTab === 'cobranza' ? <CobranzaView /> : <FacturacionView />}
            </motion.div>
        </div>
    );
}

function CobranzaView() {
    const [expandedSeller, setExpandedSeller] = useState<string | null>(null);
    const [expandedClient, setExpandedClient] = useState<string | null>(null);

    return (
        <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-card/50 p-6 rounded-xl border border-white/5 flex items-center justify-between">
                    <div>
                        <p className="text-gray-400 text-sm">Total por Cobrar</p>
                        <p className="text-2xl font-bold text-white">$1,770,000</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                        <DollarSign className="w-6 h-6" />
                    </div>
                </div>
                <div className="bg-card/50 p-6 rounded-xl border border-white/5 flex items-center justify-between">
                    <div>
                        <p className="text-gray-400 text-sm">Vencido {'>'} 10 días</p>
                        <p className="text-2xl font-bold text-red-500">$400,000</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center text-red-400">
                        <AlertCircle className="w-6 h-6" />
                    </div>
                </div>
                <div className="bg-card/50 p-6 rounded-xl border border-white/5 flex items-center justify-between">
                    <div>
                        <p className="text-gray-400 text-sm">Recuperado este mes</p>
                        <p className="text-2xl font-bold text-green-500">$4,500,000</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
                        <Check className="w-6 h-6" />
                    </div>
                </div>
            </div>

            {/* Tree View */}
            <div className="bg-card/30 rounded-xl border border-white/5 overflow-hidden">
                <div className="p-4 bg-white/5 border-b border-white/5 font-semibold text-gray-300">
                    Desglose por Vendedor
                </div>
                <div>
                    {ACCOUNTS_RECEIVABLE.map((seller) => (
                        <div key={seller.seller} className="border-b border-white/5 last:border-0">
                            {/* Seller Header */}
                            <button
                                onClick={() => setExpandedSeller(expandedSeller === seller.seller ? null : seller.seller)}
                                className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    {expandedSeller === seller.seller ? <ChevronDown className="w-4 h-4 text-gray-400" /> : <ChevronRight className="w-4 h-4 text-gray-400" />}
                                    <span className="font-bold text-white text-lg">{seller.seller}</span>
                                </div>
                                <div className="text-right">
                                    <span className="text-sm text-gray-400 block">Total Adeudado</span>
                                    <span className="font-mono text-green-400 font-bold">${seller.totalDue.toLocaleString()}</span>
                                </div>
                            </button>

                            <AnimatePresence>
                                {expandedSeller === seller.seller && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden bg-black/20"
                                    >
                                        {seller.clients.map(client => (
                                            <div key={client.name} className="border-t border-white/5 pl-8">
                                                <button
                                                    onClick={() => setExpandedClient(expandedClient === client.name ? null : client.name)}
                                                    className="w-full flex items-center justify-between p-3 hover:bg-white/5 transition-colors"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        {expandedClient === client.name ? <ChevronDown className="w-4 h-4 text-gray-500" /> : <ChevronRight className="w-4 h-4 text-gray-500" />}
                                                        <span className="font-medium text-gray-200">{client.name}</span>
                                                    </div>
                                                    <span className="font-mono text-gray-300 mr-4">${client.totalDue.toLocaleString()}</span>
                                                </button>

                                                <AnimatePresence>
                                                    {expandedClient === client.name && (
                                                        <motion.div
                                                            initial={{ height: 0 }}
                                                            animate={{ height: 'auto' }}
                                                            exit={{ height: 0 }}
                                                            className="pl-8 pb-3 pr-4"
                                                        >
                                                            <table className="w-full text-sm">
                                                                <thead className="bg-white/5 text-gray-400">
                                                                    <tr>
                                                                        <th className="p-2 text-left">Factura</th>
                                                                        <th className="p-2 text-left">Fecha</th>
                                                                        <th className="p-2 text-left">Estatus</th>
                                                                        <th className="p-2 text-right">Monto</th>
                                                                        <th className="p-2 text-center">Acciones</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {client.invoices.map(inv => (
                                                                        <tr key={inv.id} className="border-b border-white/5 text-gray-300">
                                                                            <td className="p-2">{inv.id}</td>
                                                                            <td className="p-2">{inv.date}</td>
                                                                            <td className="p-2">
                                                                                <span className={cn(
                                                                                    "px-2 py-0.5 rounded-full text-xs border",
                                                                                    inv.status === 'Vencida' ? "bg-red-900/20 text-red-400 border-red-800" :
                                                                                        inv.status === 'Por Vencer' ? "bg-yellow-900/20 text-yellow-400 border-yellow-800" :
                                                                                            "bg-green-900/20 text-green-400 border-green-800"
                                                                                )}>{inv.status}</span>
                                                                            </td>
                                                                            <td className="p-2 text-right font-mono">${inv.amount.toLocaleString()}</td>
                                                                            <td className="p-2 flex justify-center gap-2">
                                                                                <button className="text-blue-400 hover:text-blue-300" title="Registrar Pago">
                                                                                    <CreditCard className="w-4 h-4" />
                                                                                </button>
                                                                                <button className="text-gray-400 hover:text-white" title="Descargar PDF">
                                                                                    <Download className="w-4 h-4" />
                                                                                </button>
                                                                            </td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                            </table>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function FacturacionView() {
    return (
        <div className="space-y-6">
            <div className="bg-card/50 p-6 rounded-xl border border-white/5">
                <h3 className="text-lg font-bold text-white mb-4">Cargas Pendientes de Facturar</h3>

                <table className="w-full text-left border-collapse">
                    <thead className="bg-white/5">
                        <tr>
                            <th className="p-3 text-xs font-semibold text-gray-400">Folio Carga</th>
                            <th className="p-3 text-xs font-semibold text-gray-400">Cliente</th>
                            <th className="p-3 text-xs font-semibold text-gray-400">Producto</th>
                            <th className="p-3 text-xs font-semibold text-gray-400">Litros</th>
                            <th className="p-3 text-xs font-semibold text-gray-400">Importe</th>
                            <th className="p-3 text-xs font-semibold text-gray-400">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {/* Mock pending loads to invoice */}
                        <tr className="hover:bg-white/5 transition-colors">
                            <td className="p-3 text-white">EN26QRO01</td>
                            <td className="p-3 text-gray-300">Gasolineras SA</td>
                            <td className="p-3 text-gray-300">Diesel</td>
                            <td className="p-3 text-gray-300">30,000</td>
                            <td className="p-3 text-white font-mono">$630,000</td>
                            <td className="p-3">
                                <button className="bg-primary hover:bg-primary/80 text-white px-3 py-1.5 rounded-md text-xs font-medium transition-colors">
                                    Generar Factura
                                </button>
                            </td>
                        </tr>
                        <tr className="hover:bg-white/5 transition-colors">
                            <td className="p-3 text-white">EN26QRO02</td>
                            <td className="p-3 text-gray-300">Estaciones del Centro</td>
                            <td className="p-3 text-gray-300">Magna</td>
                            <td className="p-3 text-gray-300">20,000</td>
                            <td className="p-3 text-white font-mono">$390,000</td>
                            <td className="p-3">
                                <button className="bg-primary hover:bg-primary/80 text-white px-3 py-1.5 rounded-md text-xs font-medium transition-colors">
                                    Generar Factura
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
