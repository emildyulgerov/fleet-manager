import { CarService } from "./data/CarService";
import { Collection } from "./data/Collection";
import { Car, Truck } from "./data/models";
import { myStorage } from "./data/Storage";
import { TruckService } from "./data/TruckService";
import { div, h3, p, span, strong } from "./dom/dom";
import { Editor } from "./dom/Editor";

const containerDiv = document.getElementById('container') as HTMLDivElement;
const status = document.getElementById('status');
const renter = document.getElementById('renter');
const endBtn = document.querySelector('.release') as HTMLButtonElement;


const main = document.querySelector('main');
const toBeReplaced = document.getElementById('mainContainer');

const storage = new myStorage();

const carCollection = new Collection(storage, 'cars');
const truckCollection = new Collection(storage, 'trucks');

const carServices = new CarService(carCollection);
const truckServices = new TruckService(truckCollection);

const form = document.querySelector('form');


const params = new URLSearchParams(window.location.search);
const id = params.get('id');
start();
async function start() {
    const allCars = await carServices.getAll();
    const allTrucks = await truckServices.getAll();

    const allVehicles: any[] = [...allCars, ...allTrucks];

    const record = allVehicles.filter(v => v.id == id);
    
    const look = createLook(record[0]);
    main.replaceChild(look, toBeReplaced);
    console.log(record[0]);
    
    async function onSubmit(data: any){
        record[0].rentedTo = `${data.name}`;
        if (record[0] instanceof Car){
            await carServices.update(id, record[0]);
        } else if (record[0] instanceof Truck){
            await truckServices.update(id, record[0]);
        }
        containerDiv.hidden = false;
        form.hidden = true;
        status.textContent = 'Rented';
        renter.textContent = `${data.name}`;
    }
    if (record[0].rentedTo == 'Available') {
        containerDiv.hidden = true;
        status.textContent = 'Available';
    } else {
        form.hidden = true;
        status.textContent = 'Rented';
        renter.textContent = `${record[0].rentedTo}`
    }
    const formEditor = new Editor(form, onSubmit);
    
    
    endBtn.addEventListener('click', async () => {
        record[0].rentedTo = 'Available';
        if (record[0] instanceof Car){
            await carServices.update(id, record[0]);
        } else if (record[0] instanceof Truck){
            await truckServices.update(id, record[0]);
        }
        status.textContent = 'Available';
        containerDiv.hidden = true;
        form.hidden = false;
    })
    
  
}

function createLook(data: Car | Truck) {
    let rec: Node;
    if (data instanceof Car) {
        rec = h3({}, `${data.make} ${data.model}`, div({ className: 'details' },
            p({}, span({ className: 'col' }, `ID`), strong({}, `${data.id}`)),
            p({}, span({ className: 'col' }, `Body type:`), strong({}, `${data.bodyType}`)),
            p({}, span({ className: 'col' }, `Seats:`), strong({}, `${data.numberOfSeats.toString()}`)),
            p({}, span({ className: 'col' }, `Transmission`), strong({}, `${data.transmission}`)),
            p({}, span({ className: 'col' }, `Rental Price:`), strong({}, `$${data.rentalPrice}/day`))));
    } else {
        rec = h3({}, `${data.make} ${data.model}`, div({ className: 'details' },
            p({}, span({ className: 'col' }, `ID`), strong({}, `${data.id}`)),
            p({}, span({ className: 'col' }, `Cargo:`), strong({}, `${data.cargoType}`)),
            p({}, span({ className: 'col' }, `Capacity:`), strong({}, `${data.capacity.toString()}`)),
            p({}, span({ className: 'col' }, `Rental Price:`), strong({}, `$${data.rentalPrice}/day`))));
    }
    return rec;
}




