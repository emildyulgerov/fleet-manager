import { Collection } from "./data/Collection";
import { CarData, CarService } from "./data/CarService";
import { myStorage } from "./data/Storage";
import { Editor } from "./dom/Editor";
import { Table } from "./dom/Table";
import { createCarRow, hydrate, identifyCar } from "./util";
import { Car } from "./data/models";


//initialize the connection with the 'storage' (in this case - localStorage, but could be changed easily)
export const carStorage = new myStorage();
//initialize an abstraction/facade so we don't need to pass as much arguments
export const carCollection = new Collection(carStorage, 'cars');
//one more layer of abstraction specifically for managing our cars
export const carService = new CarService(carCollection);

const table = document.querySelector('table');

//the class which helps us manage the tables
const tableController = new Table(table, createCarRow, identifyCar)



const addBtn = document.getElementById('newBtn') as HTMLButtonElement;
const formAdd = document.getElementById('new-car') as HTMLFormElement;
const formEdit = document.getElementById('edit-car') as HTMLFormElement;
const sectionAdd = document.getElementById('sectionAdd');   
const sectionEdit = document.getElementById('sectionEdit');

//controllers for the new car/edit car functionality
const newCarEditor = new Editor(formAdd, onSubmit.bind(null, tableController));
const editCarEditor = new Editor(formEdit, onEdit.bind(null, tableController))


//newCarEditor.remove();
editCarEditor.remove();
addBtn.hidden = true;
addBtn.addEventListener('click', () => {
    newCarEditor.attachTo(sectionAdd);
    editCarEditor.remove();
    addBtn.hidden = true;
})

tableController.element.addEventListener('click', onTableClick);

hydrate(carService, tableController);

export function onTableClick(e: MouseEvent){
    if (e.target instanceof HTMLButtonElement){
        if(e.target.className == 'action edit'){
            newCarEditor.remove();
            editCarEditor.attachTo(sectionEdit);
            addBtn.hidden = false;

            const id = e.target.parentElement.parentElement.className
            const record = tableController.get(id);
            editCarEditor.setValues(record);
        } else { 
            if (confirm('Are you sure you want to delete this car?')){
            const id = e.target.parentElement.parentElement.className;
            tableController.remove(id);
            carCollection.delete(id);
            }
        }
    }
}


async function onEdit(tableController: Table, {id, type, make, model, rentalPrice, rentedTo, bodyType, numberOfSeats, transmission}){

    const record = await carService.update(id, {type, make, model, rentalPrice, rentedTo, bodyType, numberOfSeats, transmission})
    
    tableController.replace(id, record);
    editCarEditor.remove();
    newCarEditor.attachTo(sectionAdd);
}



async function onSubmit(table: Table, {make, model, rentalPrice, rentedTo, bodyType, numberOfSeats, transmission}){

    const result:CarData = {
        make,
        model,
        rentalPrice,
        rentedTo: 'Available',
        bodyType,
        numberOfSeats,
        transmission,
        type: 'Car',
    }

    const record = await carService.create(result);
    tableController.add(record);
    newCarEditor.clear();
}
