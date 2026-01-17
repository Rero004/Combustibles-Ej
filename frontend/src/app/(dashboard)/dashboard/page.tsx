"use client";

import { MOCK_EMPLOYEES, MOCK_TASKS } from "@/lib/mockData";
import { QrCode, Calendar, Clock, CheckCircle2, Circle } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function DashboardHome() {
    const employee = MOCK_EMPLOYEES[0]; // Simulator logged in user
    const [tasks, setTasks] = useState(MOCK_TASKS);

    const toggleTask = (taskId: string) => {
        setTasks(tasks.map(t =>
            t.id === taskId ? { ...t, completed: !t.completed } : t
        ));
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-3xl font-bold text-white">Hola, {employee.name.split(' ')[0]} 👋</h1>
                    <p className="text-muted-foreground mt-1">Bienvenido a tu panel de control</p>
                </div>
                <div className="flex flex-col items-end">
                    <p className="text-xl font-mono text-white tracking-wider">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                    <p className="text-sm text-gray-500">{new Date().toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'long' })}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Profile Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-card/50 border border-white/5 rounded-2xl p-6 backdrop-blur-sm"
                >
                    <div className="flex flex-col items-center text-center">
                        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary/20 mb-4">
                            <img src={employee.photoUrl} alt={employee.name} className="w-full h-full object-cover" />
                        </div>
                        <h3 className="text-xl font-bold text-white">{employee.name}</h3>
                        <p className="text-primary font-medium bg-primary/10 px-3 py-1 rounded-full text-xs mt-2">{employee.role}</p>

                        <div className="mt-8 w-full p-4 bg-white/5 rounded-xl border border-white/5 flex flex-col items-center group cursor-pointer hover:bg-white/10 transition-colors">
                            <QrCode className="w-12 h-12 text-white mb-2 group-hover:scale-110 transition-transform" />
                            <span className="text-sm text-gray-400">Escanea para Registrar Entrada/Salida</span>
                        </div>
                    </div>
                </motion.div>

                {/* Task Manager */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="lg:col-span-2 bg-card/50 border border-white/5 rounded-2xl p-6 backdrop-blur-sm flex flex-col"
                >
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                            <CheckCircle2 className="text-primary w-5 h-5" />
                            Mis Tareas Asignadas
                        </h3>
                        <button className="text-sm bg-primary hover:bg-primary/80 text-white px-4 py-2 rounded-lg transition-colors">
                            + Nueva Tarea
                        </button>
                    </div>

                    <div className="space-y-4 overflow-y-auto flex-1 pr-2 max-h-[400px]">
                        {tasks.map((task) => (
                            <div
                                key={task.id}
                                className={cn(
                                    "group flex items-center justify-between p-4 rounded-xl border transition-all duration-300",
                                    task.completed
                                        ? "bg-green-900/10 border-green-900/30 opacity-60"
                                        : "bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/10"
                                )}
                            >
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={() => toggleTask(task.id)}
                                        className={cn(
                                            "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors",
                                            task.completed ? "bg-green-500 border-green-500" : "border-gray-500 group-hover:border-primary"
                                        )}
                                    >
                                        {task.completed && <CheckCircle2 className="w-4 h-4 text-white" />}
                                    </button>
                                    <div>
                                        <h4 className={cn("font-medium text-white", task.completed && "line-through text-gray-500")}>
                                            {task.title}
                                        </h4>
                                        <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                                            {task.description}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                    <Calendar className="w-3 h-3" />
                                    <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Quick Actions / Stats (Optional Spacer) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Placeholder for future expansion */}
            </div>
        </div>
    );
}
