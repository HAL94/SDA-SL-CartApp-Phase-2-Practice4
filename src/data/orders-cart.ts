import { Order } from "../cart/models/order.model";

export class OrdersCart {
    static ordersCart: Order[] = [];
    static currentId = 1;
    
    static getCurrentTotal = () => {
        let total = 0;

        OrdersCart.ordersCart.forEach(order => total += order.orderPrice);

        return total;
    }
}