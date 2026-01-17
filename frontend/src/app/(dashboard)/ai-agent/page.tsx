"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Phone, Video, MoreVertical, Paperclip, Smile, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// Mock AI Logic
const generateResponse = (input: string) => {
    const lowerInput = input.toLowerCase();

    if (lowerInput.includes('total') && lowerInput.includes('cobrar')) {
        return "El total de cuentas por cobrar al momento es de **$1,770,000 MXN**. \n\nEsto incluye $400,000 vencidos (más de 10 días).";
    }
    if (lowerInput.includes('factura') && lowerInput.includes('vieja')) {
        return "La factura más antigua es la **FAC-002** de *Gasolineras SA* por $400,000 MXN, con fecha 05/01/2025 (12 días vencida).";
    }
    if (lowerInput.includes('resumen') && lowerInput.includes('monitoreo')) {
        return "Resumen de Flota:\n- **En Tránsito:** 1 Unidad\n- **Detenidas:** 1 Unidad\n- **En Descarga:** 1 Unidad\n- **Esperando Carga:** 1 Unidad\n\nTotal de unidades activas: 4.";
    }
    if (lowerInput.includes('hola') || lowerInput.includes('buenos dias')) {
        return "Hola Director. Soy tu asistente operativo. Pregúntame sobre el estado de la empresa. Ej: '¿Cual es el total por cobrar?'";
    }

    return "Entendido. Procesando tu solicitud de '" + input + "'... (Simulación: Intenta preguntar 'total por cobrar', 'factura mas vieja' o 'resumen monitoreo')";
};

export default function AIAgentPage() {
    const [messages, setMessages] = useState<{ id: number, text: string, sender: 'user' | 'bot' }[]>([
        { id: 1, text: "Hola Director. He realizado el corte de medio día. ¿Quieres el resumen?", sender: 'bot' }
    ]);
    const [inputText, setInputText] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputText.trim()) return;

        const userMsg = { id: Date.now(), text: inputText, sender: 'user' as const };
        setMessages(prev => [...prev, userMsg]);
        setInputText("");
        setIsTyping(true);

        setTimeout(() => {
            const botResponse = generateResponse(userMsg.text);
            setMessages(prev => [...prev, { id: Date.now() + 1, text: botResponse, sender: 'bot' as const }]);
            setIsTyping(false);
        }, 1500);
    };

    return (
        <div className="h-[calc(100vh-100px)] flex items-center justify-center p-4">
            <div className="w-full max-w-4xl h-full bg-[#0b141a] rounded-xl overflow-hidden shadow-2xl flex border border-white/5">
                {/* Contact List (Left Side - Desktop only) */}
                <div className="hidden md:flex w-[350px] bg-[#111b21] flex-col border-r border-white/10">
                    <div className="p-4 bg-[#202c33] flex items-center justify-between">
                        <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center">
                            <User className="text-gray-300" />
                        </div>
                        <div className="flex gap-4 text-gray-400">
                            <CircleDashedIcon />
                            <MessageIcon />
                            <MoreVertical className="w-5 h-5" />
                        </div>
                    </div>
                    <div className="p-2">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                            <input className="w-full bg-[#202c33] rounded-lg py-2 pl-10 pr-4 text-sm text-gray-300 placeholder:text-gray-500 focus:outline-none" placeholder="Busca un chat o inicia uno nuevo." />
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto">
                        <div className="flex items-center gap-3 p-3 bg-[#2a3942] hover:bg-[#202c33] cursor-pointer border-b border-white/5">
                            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                                <Bot className="text-white w-7 h-7" />
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between">
                                    <span className="text-white font-medium">Asistente Operativo</span>
                                    <span className="text-xs text-gray-500">12:30</span>
                                </div>
                                <span className="text-sm text-gray-400 truncate">Hola Director. He realizado el corte...</span>
                            </div>
                        </div>
                        {/* Other simulated chats */}
                        <div className="flex items-center gap-3 p-3 hover:bg-[#202c33] cursor-pointer">
                            <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold">
                                JP
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between">
                                    <span className="text-white font-medium">Juan Perez (Chofer)</span>
                                    <span className="text-xs text-gray-500">Ayer</span>
                                </div>
                                <span className="text-sm text-gray-400 truncate">Ya llegue a la planta</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Chat Area */}
                <div className="flex-1 flex flex-col bg-[#0b141a] relative">
                    {/* Chat Background Pattern */}
                    <div className="absolute inset-0 opacity-[0.06] bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')]" />

                    {/* Chat Header */}
                    <div className="bg-[#202c33] p-4 flex justify-between items-center z-10 border-b border-white/5">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                                <Bot className="text-white w-6 h-6" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-white font-medium">Asistente Operativo IA</span>
                                <span className="text-xs text-gray-400">En línea</span>
                            </div>
                        </div>
                        <div className="flex gap-4 text-gray-400">
                            <Search className="w-5 h-5 cursor-pointer" />
                            <MoreVertical className="w-5 h-5 cursor-pointer" />
                        </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 z-10">
                        {messages.map((msg) => (
                            <motion.div
                                key={msg.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={cn(
                                    "max-w-[80%] rounded-lg p-2 px-3 text-sm relative shadow-sm break-words",
                                    msg.sender === 'user'
                                        ? "bg-[#005c4b] text-white self-end ml-auto rounded-tr-none"
                                        : "bg-[#202c33] text-white self-start rounded-tl-none"
                                )}
                            >
                                <div className="whitespace-pre-wrap">{msg.text}</div>
                                <span className={cn(
                                    "text-[10px] block text-right mt-1",
                                    msg.sender === 'user' ? "text-green-200" : "text-gray-400"
                                )}>
                                    {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </motion.div>
                        ))}
                        {isTyping && (
                            <div className="bg-[#202c33] text-white self-start rounded-lg p-3 rounded-tl-none w-16">
                                <div className="flex gap-1">
                                    <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" />
                                    <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100" />
                                    <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200" />
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="bg-[#202c33] p-3 z-10 flex items-center gap-3">
                        <Smile className="text-gray-400 w-6 h-6 cursor-pointer" />
                        <Paperclip className="text-gray-400 w-6 h-6 cursor-pointer" />
                        <form onSubmit={handleSend} className="flex-1 flex gap-2">
                            <input
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                className="flex-1 bg-[#2a3942] rounded-lg py-2 px-4 text-white placeholder:text-gray-500 focus:outline-none"
                                placeholder="Escribe un mensaje"
                            />
                            {inputText ? (
                                <button type="submit" className="p-2 text-gray-400 hover:text-white">
                                    <Send className="w-6 h-6" />
                                </button>
                            ) : (
                                <div className="p-2 text-gray-400">
                                    <div className="w-6 h-6" /> {/* Placeholder for Mic */}
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Icons placeholders
const CircleDashedIcon = () => (
    <svg viewBox="0 0 24 24" width="24" height="24" className="w-6 h-6"><path fill="currentColor" d="M12 20.664a8.664 8.664 0 1 1 0-17.328 8.664 8.664 0 0 1 0 17.328zm0-1.802a6.862 6.862 0 1 0 0-13.724 6.862 6.862 0 0 0 0 13.724zm0-8.546a1.682 1.682 0 1 1 0-3.364 1.682 1.682 0 0 1 0 3.364zm0 2.226a1.682 1.682 0 1 1 0 3.364 1.682 1.682 0 0 1 0-3.364z"></path></svg>
)
const MessageIcon = () => (
    <svg viewBox="0 0 24 24" width="24" height="24" className="w-6 h-6"><path fill="currentColor" d="M19.005 3.175H4.674C3.642 3.175 3 3.789 3 4.821V21.02l3.544-3.514h12.461c1.033 0 2.064-1.06 2.064-2.093V4.821c-.001-1.032-1.032-1.646-2.064-1.646zm-4.989 9.869H7.041V11.1h6.975v1.944zm3.987-3.775H7.041V7.325h10.962v1.944z"></path></svg>
)
