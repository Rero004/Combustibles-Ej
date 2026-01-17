"use client";

import dynamic from "next/dynamic";
import { Unit } from "@/lib/mockData";

const Map = dynamic(() => import("./Map"), {
    ssr: false,
    loading: () => <div className="w-full h-full bg-[#1a1a1a] animate-pulse flex items-center justify-center text-gray-500">Cargando Mapa...</div>
});

export default function MapWrapper({ units }: { units: Unit[] }) {
    return <Map units={units} />;
}
