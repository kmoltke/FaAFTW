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

    constructor(managerType: managerType) {
        this.managerType = managerType
    }

    // get by id
    async getByID(itemId: number) {
        let itemArray = await this.getItemArray(this.managerType);
        let index = this.findItem(itemArray, itemId);
        if (index === -1)
            throw new Error(`Item with ID:${itemId} doesn't exist`);
        else return itemArray[index];
    }

    /***
     * Adds a new item to the datafile
     * @param newItem json object of which to add
     * @throws an error if item already exists
     */
    async add(newItem: user | category | basket | vinyl) {
        let itemArr: Array<user | category | basket | vinyl> = await this.getItemArray(this.managerType)

        // If item already exists:
        if (this.findItem(itemArr, newItem.id) !== -1) {
            throw new Error(`Item with ID: ${newItem.id} already exists`)
        }

        // push to itemArray and save
        itemArr.push(newItem)
        await this.save(itemArr)
    }

    // update existing item
    async update(itemId: number, newItem: user | category | basket | vinyl) {
        let itemArray = await this.getItemArray(this.managerType)
        let index = this.findItem(itemArray, itemId)
        if (index === -1)
            throw new Error(`Item with ID:${itemId} doesn't exist`)
        else {
            itemArray[index] = newItem;
            await this.save(itemArray);
        }
    }

    // delete existing item
    async remove(itemId: number) {
        let itemArray = await this.getItemArray(this.managerType)
        let index = this.findItem(itemArray, itemId)
        if (index === -1)
            throw new Error(`Item with ID:${itemId} doesn't exist`)
        else {
            itemArray.splice(index, 1); // remove item from array
            await this.save(itemArray);
        }
    }


    /***
     * Get the array of item from the json data file
     * @param managerType - the item type
     * @returns items[key] - array of items
     */
    async getItemArray(managerType: managerType) {
        let items: data = await this.getAll()
        type dataKey = keyof typeof items
        let key: dataKey

        switch (managerType) {
            case 0:
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

    async getByCategory(category: string, sub: string) {
        let allVinyls = await this.getItemArray(managerType.vinyls)

        return (allVinyls as vinyl[]).filter(function (v) {
            type dataKey = keyof typeof v
            let key: dataKey
            key = category as dataKey
            let value = (v[key] as string).toLowerCase()
            return (value == sub);
        })
    }

    /***
     * Get the whole json object from the datafile
     * @returns items - json object
     */
    async getAll() {
        try {
            let itemsTxt = fs.readFile(this.FILEPATH, "utf8");
            let items: data = JSON.parse(await itemsTxt);
            return items;
        } catch (err: any) {
            throw err;
        }
    }

    /***
     * Saves a new itemArray to the json datafile
     * @param newItemArray
     */
    async save(newItemArray: any) {
        let items = await this.getAll()

        // Replace the property of the item with the new item array:
        switch (this.managerType) {
            case 0:
                items.users = newItemArray
                break
            case 1:
                items.categories = newItemArray
                break
            case 2:
                items.baskets = newItemArray
                break
            case 3:
                items.vinyls = newItemArray
                break
            default:
                throw new Error("Error!")
        }

        // format and write to datafile:
        let itemsTxt = JSON.stringify(items);
        await fs.writeFile(this.FILEPATH, itemsTxt);
    }

    /***
     * Search for an id in an array
     * @param arr
     * @param Id
     * @returns index of element in arr
     */
    findItem(arr: Array<user|category|basket|vinyl>, Id: number): number {
        return arr.findIndex(
            (currItem) => currItem.id === Id
        );
    }
}











