import { RentedTo, CargoType, Truck } from "./models"
import { VehicleService } from "./Service"
import { Record } from "./Storage"

export type TruckData = {
        type: 'Truck';
        make: string,
        model: string,
        rentalPrice: number,
        rentedTo: RentedTo,
        cargoType: CargoType,
        capacity: number
}

export class TruckService extends VehicleService<Truck, TruckData>{
    protected parseRecord(record: Record): Truck {
        const data = record as any;
        const res = new Truck(
            data.id,
            data.make,
            data.model,
            data.rentalPrice,
            data.rentedTo,
            data.cargoType,
            data.capacity,
            data.type
        )
        return res;
    }
    protected validate(data: any): void {
        if (data.make.trim() === ""){
            throw new TypeError('Incompatible make.')
        }
        if (data.model.trim() === ''){
            throw new TypeError('Incompatible model.')
        }
        if (data.rentalPrice === ''){
            throw new TypeError('Incompatible rentalPrice.')
        }
        // if (typeof data.rentedTo !== 'string' || typeof data.rentedTo !== null){
        //     throw new TypeError('Incompatible rentedTo.')
        // }
        // if (typeof data.cargoType !== 'string'){
        //     throw new TypeError('Incompatible cargoType.')
        // // }
        // if (typeof data.capacity !== 'number'){
        //     throw new TypeError('Incompatible capacity.')
        // }
    }

}