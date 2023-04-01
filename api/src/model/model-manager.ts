import * as fs from "fs/promises";
import {basket} from "../basket/baskets.model";
import {category} from "../categories/categories.model";
import {user} from "../users/users.model";
import {vinyl} from "../vinyls/vinyls.model";

export enum managerType {
    users,
    categories,
    baskets,
    vinyls
}

interface data  {
    users: user[],
    categories: category[],
    baskets: basket[],
    vinyls: vinyl[]
}


export class ModelManager<T extends { id: number }> {
    private FILEPATH: string = './data/data.json'

    private managerType: managerType
    // TODO: get rid of undefined with an exception
    // private itemArray: Array<user | category | basket | vinyl | undefined>


    constructor(managerType: managerType) {
        this.managerType = managerType
        // if (this.itemArray === undefined) throw new Error("Item array is undefined")
        // this.MANAGERTYPE = managerType
    }

    async getItemArray(managerType: managerType) {
        let items: data = await this.getAll()
        // if (items === undefined) throw new Error("this is an error")
        type dataKey = keyof typeof items
        let key: dataKey

        switch (managerType) {
            case 0:
                // return items.users
                key = 'users' as dataKey
                return items[key]

            case 1:
                // return items["categories"] as category[]
                key = 'categories' as dataKey
                return items[key]
            case 2:
                key = 'baskets' as dataKey
                return items[key]
            case 3:
                key = 'vinyls' as dataKey
                return items[key]
            default:
                throw new Error("undefined!")
        }
    }

    async getAll() {
        try {
            let itemsTxt = fs.readFile(this.FILEPATH, "utf8");
            let items: data = JSON.parse(await itemsTxt);
            return items;
        } catch (err: any) {
            // if (err.code === "ENOENT") {
            //     // file does not exist
            //     // await this.save({"id": 0}); // create a new file with ampty array
            //     // return {}; // return empty array
            // } // // cannot handle this exception, so rethrow
            throw err;
        }
    }

    // save array of items to file
    async save(arr: any) {
        let items = await this.getAll()
        switch (this.managerType) {
            case 0:
                items.users = arr
                break
            case 1:
                items.categories = arr
                break
            case 2:
                items.baskets = arr
                break
            case 3:
                items.vinyls = arr
                break
            default:
                throw new Error("Error!")
        }
        let itemsTxt = JSON.stringify(items);
        await fs.writeFile(this.FILEPATH, itemsTxt);
    }

    // test function for item ID
    // findItem(Id: number): number {
    //     // if (this.itemArray === undefined) throw new Error()
    //     return this.itemArray.findIndex(
    //         (currItem) => currItem.id === Id
    //     );
    // }

    // get by id
    // async getByID(itemId: number) {
    //     let itemArray = await this.getAll();
    //     let index = this.findItem(itemId);
    //     if (index === -1)
    //         throw new Error(`Item with ID:${itemId} doesn't exist`);
    //     else return itemArray[index];
    // }

    // create a new item
    // @ts-ignore
    // async add(newItem: user | category | basket | vinyl) {
    //     // let items = await this.getAll()
    //     let itemArr = await this.getItemArray(this.managerType)
    //     // if (newItem === undefined || this.itemArray === undefined) throw new Error()
    //     // if (this.findItem(newItem.id) !== -1) {
    //     //     throw new Error(
    //     //         `Item with Id:${newItem.id} already exists`
    //     //     )
    //     // }
    //     // @ts-ignore
    //     this.itemArray.push(newItem)
    //     await this.save()
    // }

    async add(newItem: user | category | basket | vinyl) {
        let itemArr: Array<user | category | basket | vinyl> | undefined = await this.getItemArray(this.managerType)
        console.log(typeof itemArr)
        if (!Array.isArray(itemArr)) {
            throw new Error("Item array is not an array")
        }
        let newArray = itemArr as Array<user | category | basket | vinyl>
        newArray.push(newItem)
        itemArr = newArray
        await this.save(itemArr)
    }

    // async add(newItem: T) {
    //     let items = await this.getAll();
    //     let itemArray: T[] = items.
    //     if (this.findItem(itemArray, newItem.id) !== -1)
    //         throw new Error(
    //             `Item with Id:${newItem.id} already exists`
    //         );
    //     itemArray.push(newItem);
    //     await this.save(itemArray);
    // }

    // update existing item
    // async update(itemId: number, item: T) {
    //     let itemArray = await this.getAll();
    //     let index = this.findItem(itemArray, itemId); // findIndex
    //     if (index === -1)
    //         throw new Error(`Item with ID:${itemId} doesn't exist`);
    //     else {
    //         itemArray[index] = item;
    //         await this.save(itemArray);
    //     }
    // }
    //
    // // delete existing item
    // async remove(itemId: number) {
    //     let itemArray = await this.getAll();
    //     let index = this.findItem(itemArray, itemId); // findIndex
    //     if (index === -1)
    //         throw new Error(`Item with ID:${itemId} doesn't exist`);
    //     else {
    //         itemArray.splice(index, 1); // remove item from array
    //         await this.save(itemArray);
    //     }
    // }
}











