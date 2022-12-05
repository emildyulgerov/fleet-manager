import { BodyType, Car, Gearbox } from "./models";
import { VehicleService } from "./Service";
import { Record } from "./Storage";


export type CarData = {
    type: 'Car',
    make: string,
    model: string,
    rentalPrice: number,
    rentedTo: string | null,
    bodyType: 'sedan' | 'suv' | 'hatchback',
    numberOfSeats: number,
    transmission: 'automatic' | 'manual'
}



export class CarService extends VehicleService<Car, CarData>{
  
    protected parseRecord(record: Record): Car {
        const data = record as any;
        const result = new Car(
            data.id,
            data.make,
            data.model,
            Number(data.rentalPrice),
            data.rentedTo,
            data.bodyType,
            data.numberOfSeats,
            data.transmission,
            data.type
        )

        return result;
    }
    protected validate(data: any): void{
        if (data.make.trim() === ''){
            throw new TypeError('Invalid property make.')
        }
        if (data.model.trim() === ''){
            throw new TypeError('Invalid property model.')
        }
        if (data.rentalPrice === ''){
            throw new TypeError('Invalid property rentalPrice.')
        }
        // if (typeof data.rentedTo !== 'string' && typeof data.rentedTo !== null){
        //     throw new TypeError('Invalid property rentedTo.')
        // }
        if (typeof data.bodyType !== 'string'){
            throw new TypeError('Invalid property bodyType.')
        }
        if (data.numberOfSeats === ''){
            throw new TypeError('Invalid property numberofSeats.')
        }
        if (typeof data.transmission !== 'string'){
            throw new TypeError('Invalid property transmission.')
        }
    }
  
}