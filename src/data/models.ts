import { Record, RecordId } from "./Storage";
export type BodyType = 'sedan' | 'suv' | 'hatchback'
export type Gearbox = 'automatic' | 'manual';
export type CargoType = 'box' | 'flatbed' | 'van';
export type RentedTo = string | null;

export class Car implements Record {
    constructor(
        public id: RecordId,
        public make: string,
        public model: string,
        public rentalPrice: number,
        public rentedTo: string | null | undefined,
        public bodyType: 'sedan' | 'suv' | 'hatchback',
        public numberOfSeats: number,
        public transmission: 'automatic' | 'manual',
        public type: 'Car'
    ){ }
}

export class Truck implements Record{
    constructor(
        public id: RecordId,
        public make: string,
        public model: string,
        public rentalPrice: number,
        public rentedTo: RentedTo,
        public cargoType: CargoType,
        public capacity: number,
        public type: 'Truck'
    ) { }
}