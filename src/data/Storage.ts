import { generateId } from "../util";


export type RecordId = string;

export interface Record  {
    id: RecordId,
    // make: string,
    // model: string,
    // rentalPrice: number,
    // rentedTo: string | null
}

export interface Storage {
    getAll(collectionName: string): Promise<Record[]>;
    getById(collectionName: string, id: string): Promise<Record>;
    create(collectionName: string, data: any): Promise<Record>;
    update(collectionName: string, id: string, data: any): Promise<Record>;
    delete(collectionName: string, id: string): Promise<void>;
}

export class myStorage implements Storage {
    async getAll(collectionName: string): Promise<Record[]> {
        const records = localStorage.getItem(collectionName);
        return JSON.parse(records || '[]')
    }
    async getById(collectionName: string, id: string): Promise<Record> {
        const records = await this.getAll(collectionName);
        const res = records.find(i => i.id == id);
        if (res) {
            return res
        } else {
            throw new TypeError(`Could not find item with id: ${id}`);
        }
    }
    async create(collectionName: string, data: any): Promise<Record> {
        const records = await this.getAll(collectionName);
        const dataParam = Object.assign({}, data, { id: generateId() })
        records.push(dataParam);
        localStorage.setItem(collectionName, JSON.stringify(records));

        return dataParam;
    }
    async update(collectionName: string, id: string, data: any): Promise<Record> {
        const records = await this.getAll(collectionName);

        const updatedRecord = Object.assign({}, data, { id });

        const index = records.findIndex(i => i.id == id);
        if (index == -1) {
            throw new ReferenceError('Record not found');
        } else {
            records[index] = updatedRecord;
            localStorage.setItem(collectionName, JSON.stringify(records));
        }
        return updatedRecord;
    }
    async delete(collectionName: string, id: string): Promise<void> {
        const records = await this.getAll(collectionName);
        const recordToDelete = records.findIndex(i => i.id == id);
        if (recordToDelete == -1) {
            throw new ReferenceError('Record not found');
        }
        records.splice(recordToDelete, 1);
        localStorage.setItem(collectionName, JSON.stringify(records));
    }
    // async clearCollection(collectionName: string): Promise<void> {
    //     localStorage.removeItem(collectionName);
    // }
    // async clearAll(): Promise<void>{
    //     localStorage.clear();
    // }
}
