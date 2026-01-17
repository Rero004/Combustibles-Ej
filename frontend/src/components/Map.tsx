"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import * as L from "leaflet";
import { MOCK_UNITS, Unit } from "@/lib/mockData";

// Fix generic marker icon issue in Next.js
const iconUrl = "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png";
const iconRetinaUrl = "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png";
const shadowUrl = "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
    iconUrl,
    iconRetinaUrl,
    shadowUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Custom Icons for different statuses
const createCustomIcon = (color: string) => new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const icons = {
    'En Transito': createCustomIcon('green'),
    'Detenida': createCustomIcon('red'),
    'En Descarga': createCustomIcon('blue'),
    'Esperando Carga': createCustomIcon('gold'),
};

function MapUpdater() {
    const map = useMap();
    useEffect(() => {
        map.invalidateSize();
    }, [map]);
    return null;
}

export default function Map({ units }: { units: Unit[] }) {
    return (
        <MapContainer
            center={[20.5, -100.0]} // Center Mexico roughly
            zoom={6}
            style={{ height: "100%", width: "100%", zIndex: 0 }}
            className="rounded-xl overflow-hidden"
        >
            <MapUpdater />
            {/* Dark Mode Map Tiles */}
            <TileLayer
                attribution='&copy; <a href="https://www.opensleetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />

            {units.map((unit) => (
                <Marker
                    key={unit.id}
                    position={[unit.location.lat, unit.location.lng]}
                    icon={icons[unit.status] || DefaultIcon}
                >
                    <Popup className="custom-popup">
                        <div className="text-gray-900 font-sans p-1">
                            <strong className="block text-lg mb-1">{unit.name}</strong>
                            <div className="text-sm space-y-1">
                                <p><span className="font-semibold">Línea:</span> {unit.line}</p>
                                <p><span className="font-semibold">Producto:</span> {unit.fuelType}</p>
                                <p><span className="font-semibold">Estatus:</span> {unit.status}</p>
                                <p><span className="font-semibold">Capacidad:</span> {unit.capacity.toLocaleString()} L</p>
                                <p><span className="font-semibold">Chofer:</span> {unit.driver}</p>
                            </div>
                        </div>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}
