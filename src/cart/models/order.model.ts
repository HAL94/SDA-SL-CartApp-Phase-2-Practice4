import { Product } from "../../products/models/product.interface";

export class Order {  

    constructor(
        public productId: number,
        public title: string,
        public description: string,
        public imageUrl: string,
        public price: number,
        public quantity: number,
        public orderPrice: number,
        public id?: number,
        ) {}
}