import { CarService } from "./data/CarService";
import { Car, Truck } from "./data/models";
import { VehicleService } from "./data/Service";
import { TruckService } from "./data/TruckService";
import { tr, td, button } from "./dom/dom";
import { Table } from "./dom/Table";

export function generateId(): string {
    return '0000-0000'.replaceAll('0', () => (Math.random() * 16 | 0).toString(16))
}

export function createCarRow(car: Car){
    const row = tr({className: `${car.id}`}, td({}, `${car.id}`),
                        td({}, `${car.make}`),
                        td({}, `${car.model}`),
                        td({}, `${car.bodyType}`),
                        td({}, `${car.numberOfSeats}`),
                        td({}, `${car.transmission}`),
                        td({}, '$' +`${car.rentalPrice}/day`),
                        td({}, button({className : "action edit"}, `Edit`), button({className : "action delete"}, `Delete`)));
    return row;
}



export function createTruckRow(truck: Truck){
    const row = tr({className: `${truck.id}`}, td({}, `${truck.id}`),
                        td({}, `${truck.make}`),
                        td({}, `${truck.model}`),
                        td({}, `${truck.cargoType}`),
                        td({}, `${truck.capacity}`),
                        td({}, '$' +`${truck.rentalPrice}/day`),
                        td({}, button({className : "action edit"}, `Edit`), button({className : "action delete"}, `Delete`)));
    return row;
}

export function identifyCar(cars: Car[], id: string){
    return cars.find(c => c.id == id);
}

export function identifyTruck(trucks: Truck[], id:string){
    return trucks.find(t => t.id == id);
}

export async function hydrate(service: CarService | TruckService, controller: Table) {
    const vehicles = await service.getAll();
        for (let vehicle of vehicles) {
            controller.add(vehicle);
        }
}