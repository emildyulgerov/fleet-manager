import { Car, Truck } from "./data/models";
import { myStorage } from "./data/Storage";
import { a, td, tr } from "./dom/dom";
import { Table } from "./dom/Table";
import { Collection } from "./data/Collection";
import { CarService } from "./data/CarService";
import { TruckService } from "./data/TruckService";




const table = document.querySelector('.overview') as HTMLTableElement;
const tableController = new Table(table, createRow);

const form = document.querySelector('form');
//const formEditor = new Editor(form, onSubmit());



const testStorage = new myStorage();
const carStorage = new Collection(testStorage, 'cars');
const carServices = new CarService(carStorage);


const truckStorage = new Collection(testStorage, 'trucks');
const truckServices = new TruckService(truckStorage);

start();
async function start () {
    const allCars = await carServices.getAll();
    const allTrucks = await truckServices.getAll();
 

    const allVehicles:any = [...allCars, ... allTrucks];
    const params = new URLSearchParams(window.location.search);
    const type = params.get('type');

    if (type == 'cars'){
        for (let car of allCars){
            if(params.has('availableOnly')){
                if (car.rentedTo == 'Available'){
                    tableController.add(car);
                }
            } else {
                tableController.add(car);
            }
        }
    } else if (type == 'trucks'){
        for (let truck of allTrucks){
            if (params.has('availableOnly')){
                if (truck.rentedTo == 'Available'){
                    tableController.add(truck);
                }
            } else {
                tableController.add(truck);
            }
        }
    } else {
        for (let v of allVehicles){
            if(params.has('availableOnly')){
                if (v.rentedTo == 'Available'){
                    tableController.add(v);
                }
            } else {
                tableController.add(v);
            }
        }
    }
}


function createRow(data: Car | Truck) {
    if (data.rentedTo == 'Available'){
        data.rentedTo = 'Available';
    } else {
        data.rentedTo = 'Rented';
    }
   
    const row = tr({className : `${data.id}`},
                    td({}, `${data.id}`),
                    td({}, `${data.type}`),
                    td({}, `${data.make}`),
                    td({}, `${data.model}`),
                    td({}, `$${data.rentalPrice}/day`),
                    td({}, `${data.rentedTo}`),
                    td({}, a({className : 'details-link', href : `/details.html?id=${data.id}`}, 'Show Details')));

    return row;
}

