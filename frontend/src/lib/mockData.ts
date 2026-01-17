export type UnitStatus = 'En Transito' | 'Detenida' | 'En Descarga' | 'Esperando Carga';
export type FuelType = 'Magna' | 'Premium' | 'Diesel';

export interface Unit {
    id: string;
    name: string;
    line: string;
    fuelType: FuelType;
    status: UnitStatus;
    capacity: number;
    location: { lat: number; lng: number };
    driver: string;
    lastUpdate: string;
}

export interface Employee {
    id: string;
    name: string;
    role: string;
    photoUrl: string;
}

export interface Task {
    id: string;
    title: string;
    description: string;
    assignedTo: string; // Employee ID
    assignedBy: string; // Employee ID
    dueDate: string;
    completed: boolean;
}

export interface Sale {
    id: string;
    client: string;
    seller: string;
    product: FuelType;
    quantity: number;
    price: number;
    status: 'Pendiente Asignacion' | 'Asignada' | 'Entregada' | 'Facturada' | 'Cobrada';
    destination: string;
}

export const MOCK_UNITS: Unit[] = [
    {
        id: 'U-001',
        name: 'Tracto 54',
        line: 'Transportes Del Norte',
        fuelType: 'Diesel',
        status: 'En Transito',
        capacity: 65000,
        location: { lat: 20.5888, lng: -100.3899 }, // Queretaro
        driver: 'Juan Perez',
        lastUpdate: 'Hace 10 min'
    },
    {
        id: 'U-002',
        name: 'Pipa 12',
        line: 'Logistica Express',
        fuelType: 'Magna',
        status: 'En Descarga',
        capacity: 45000,
        location: { lat: 19.4326, lng: -99.1332 }, // CDMX
        driver: 'Roberto Sanchez',
        lastUpdate: 'Hace 5 min'
    },
    {
        id: 'U-003',
        name: 'Tracto 88',
        line: 'Transportes Bajio',
        fuelType: 'Premium',
        status: 'Esperando Carga',
        capacity: 30000,
        location: { lat: 21.1619, lng: -101.6866 }, // Leon
        driver: 'Miguel Angel',
        lastUpdate: 'Hace 30 min'
    },
    {
        id: 'U-004',
        name: 'Tracto 90',
        line: 'Transportes Bajio',
        fuelType: 'Diesel',
        status: 'Detenida',
        capacity: 30000,
        location: { lat: 25.67678, lng: -100.31847 }, // Monterrey
        driver: 'Luis Lopez',
        lastUpdate: 'Hace 2 horas'
    }
];

export const MOCK_EMPLOYEES: Employee[] = [
    {
        id: 'E-001',
        name: 'Carlos Mendez',
        role: 'Monitorista',
        photoUrl: 'https://ui-avatars.com/api/?name=Carlos+Mendez&background=random'
    },
    {
        id: 'E-002',
        name: 'Ana Torres',
        role: 'Gerente de Operaciones',
        photoUrl: 'https://ui-avatars.com/api/?name=Ana+Torres&background=random'
    }
];

export const MOCK_TASKS: Task[] = [
    {
        id: 'T-001',
        title: 'Revisar reporte de mermas',
        description: 'Analizar las mermas de la semana pasada de la linea Transportes Del Norte',
        assignedTo: 'E-001',
        assignedBy: 'E-002',
        dueDate: '2026-01-17T18:00:00',
        completed: false
    },
    {
        id: 'T-002',
        title: 'Confirmar descargas pendientes',
        description: 'Verificar con clientes de la zona bajio si ya recibieron sus unidades',
        assignedTo: 'E-001',
        assignedBy: 'E-002',
        dueDate: '2026-01-17T12:00:00',
        completed: true
    }
];

export const MOCK_SALES: Sale[] = [
    { id: 'S-100', client: 'Gasolineras SA', seller: 'Pedro Infante', product: 'Magna', quantity: 20000, price: 19.50, status: 'Pendiente Asignacion', destination: 'Querétaro' },
    { id: 'S-101', client: 'Estaciones del Centro', seller: 'Jose Alfredo', product: 'Diesel', quantity: 40000, price: 21.00, status: 'Asignada', destination: 'Celaya' },
    { id: 'S-102', client: 'Combustibles del Norte', seller: 'Pedro Infante', product: 'Premium', quantity: 30000, price: 22.50, status: 'Pendiente Asignacion', destination: 'San Juan del Río' },
];
