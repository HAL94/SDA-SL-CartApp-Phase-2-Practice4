import { DbFileReader } from "../../common/db-reader.interface";
import * as fs from 'fs';
import * as path from 'path';
import { Product } from './product.interface';

export class DbProductReader implements DbFileReader {
    productsPath;

    constructor() {        
        this.productsPath = path.resolve(path.join(__dirname, '../../', 'data', 'products.json'));
    }

    read(): Promise<Product[]> {
        return new Promise((resolve) => {

            fs.readFile(this.productsPath, (error, productsFile) => {
                if (error) {
                    resolve([] as Product[]);
                }
                const products: Product[] = JSON.parse(productsFile.toString());
                resolve(products);
            });
        })        
    }

    readById(id: number): Promise<Product> {
        return new Promise((resolve, reject) => {
            fs.readFile(this.productsPath, (error, productsFile) => {
                if (error) {
                    reject(null);
                }

                const products: Product[] = JSON.parse(productsFile.toString());
                const product = products.find((prod) => prod.id === id);
                if (product) {
                    return resolve(product);
                }
                reject(null);
            })
        })
    }
    post(data: any) {
        throw new Error("Method not implemented.");
    }
    deleteById(id: number) {
        throw new Error("Method not implemented.");
    }
    updateById(id: number) {
        throw new Error("Method not implemented.");
    }

}