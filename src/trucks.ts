import { Collection } from "./data/Collection";
import { myStorage } from "./data/Storage";
import { TruckData, TruckService } from "./data/TruckService";
import { Editor } from "./dom/Editor";
import { Table } from "./dom/Table";
import { createTruckRow, hydrate, identifyTruck } from "./util";

const storage = new myStorage();
const collection = new Collection(storage, 'trucks');
const truckService = new TruckService(collection);

const table = document.querySelector('table');

const tableController = new Table(table, createTruckRow, identifyTruck);

const formAdd = document.getElementById('add-truck') as HTMLFormElement;
const formEdit = document.getElementById('edit-truck') as HTMLFormElement;

const newTruckEditor = new Editor(formAdd, onSubmit.bind(null, tableController));
const editTruckEditor = new Editor(formEdit, onEdit.bind(null, tableController));


const addBtn = document.getElementById('addBtn') as HTMLButtonElement;
addBtn.addEventListener('click', () => {
    newTruckEditor.attachTo(sectionAdd);
    editTruckEditor.remove();
    addBtn.hidden = true;
})

const sectionAdd = document.getElementById('sectionAdd');   
const sectionEdit = document.getElementById('sectionEdit');

tableController.element.addEventListener('click', onTableClick);


editTruckEditor.remove();
addBtn.hidden = true;

hydrate(truckService, tableController);


async function onSubmit(table: Table, {type, make, model, rentalPrice, rentedTo, cargoType, capacity}){
    const result: TruckData = {
        make,
        model,
        rentalPrice,
        rentedTo: 'Available',
        cargoType,
        capacity,
        type: 'Truck'
    }

    const record = await truckService.create(result);
    tableController.add(record);
    newTruckEditor.clear();
}

async function onEdit(tableController: Table, {id, type, make, model, rentalPrice, rentedTo, cargoType, capacity}){

    const record = await truckService.update(id, {type, make, model, rentalPrice, rentedTo, cargoType, capacity})
    
    tableController.replace(id, record);
    editTruckEditor.remove();
    newTruckEditor.attachTo(sectionAdd);
}
export function onTableClick(e: MouseEvent){
    if (e.target instanceof HTMLButtonElement){
        if(e.target.className == 'action edit'){
            newTruckEditor.remove();
            editTruckEditor.attachTo(sectionEdit);
            addBtn.hidden = false;

            const id = e.target.parentElement.parentElement.className
            const record = tableController.get(id);
            editTruckEditor.setValues(record);
        } else { 
            if (confirm('Are you sure you want to delete this car?')){
            const id = e.target.parentElement.parentElement.className;
            tableController.remove(id);
            collection.delete(id);
            }
        }
    }
}
