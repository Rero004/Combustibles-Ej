import { Sidebar } from "@/components/Sidebar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-[#050510] flex text-foreground">
            <Sidebar />
            <main className="flex-1 ml-64 min-h-screen relative overflow-x-hidden">
                {/* Top gradient accent */}
                <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-blue-900/10 to-transparent pointer-events-none" />

                <div className="p-8 relative z-10">
                    {children}
                </div>
            </main>
        </div>
    );
}
