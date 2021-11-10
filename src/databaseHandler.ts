import {openDB} from 'idb'
import { RentHouse } from './model'

const dbName = "RentalZ"

initDB().then(()=>{
    console.log('Init Done!')
})

export async function insertRental(Rents: RentHouse) {
    const db = await openDB(dbName, 1)
    await db.put('Rent',Rents)
}



export async function getRentalById(id:number) {
    const db = await openDB(dbName,1);
    return await db.get("Rent",id)
}




export async function getAllRental() {
    const db = await openDB(dbName,1);
    return await db.transaction("Rent").objectStore("Rent").getAll();
}


export async function deleteRental(id:number) {
    const db = await openDB(dbName,1)
    await db.delete("Rent",id)
}


export async function updateNewRent(Rents:RentHouse) {
    const db = await openDB(dbName,1)
    var productDB = await db.get("Rent",Rents.id!) as RentHouse
    productDB.propertytype = Rents.propertytype
    productDB.bedsroom = Rents.bedsroom
    productDB.dateOfBirth = Rents.dateOfBirth
    productDB.moneyRentPrice = Rents.moneyRentPrice
    productDB.notes= Rents.notes
    productDB.funitureType = Rents.funitureType
    productDB.name = Rents.name
    productDB.note2 = Rents.note2
    productDB.picBlob = Rents.picBlob
    productDB.optional = Rents.optional
    productDB.arr14.push(productDB.note2)

    await db.put("Rent",productDB);
}


export async function update(Rents:RentHouse) {
    const db = await openDB(dbName,1)
    var productDB = await db.get("Rent",Rents.id!) as RentHouse
    productDB.propertytype = Rents.propertytype
    productDB.bedsroom = Rents.bedsroom
    productDB.dateOfBirth = Rents.dateOfBirth
    productDB.moneyRentPrice = Rents.moneyRentPrice
    productDB.notes= Rents.notes
    productDB.funitureType = Rents.funitureType
    productDB.name = Rents.name
    productDB.note2 = Rents.note2
    productDB.picBlob = Rents.picBlob
    productDB.optional = Rents.optional

    await db.put("Rent",productDB);
}


async function initDB() {
    const db = await openDB(dbName, 1, {
        upgrade(db) {
            // Create a store of objects
            const store = db.createObjectStore('Rent', {
                // The 'id' property of the object will be the key.
                keyPath: 'id',
                // If it isn't explicitly set, create a value by auto incrementing.
                autoIncrement: true,
            });
        },
    });
}