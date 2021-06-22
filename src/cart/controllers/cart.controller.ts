import { Request, Response, NextFunction } from "express";
import { OrdersCart } from "../../data/orders-cart";
import { Product } from "../../products/models/product.interface";
import { Order } from "../models/order.model";

export const addProuctToCart = (req: Request, res: Response, next: NextFunction) => {
    const product: Product = JSON.parse(req.body.product);
    const quantity = +req.body.quantity;
    let orderPrice = +req.body.orderPrice;

    const orderIndex = OrdersCart.ordersCart.findIndex(order => order.productId === product.id);

    if (orderIndex !== -1) {
        const orderFound = {...OrdersCart.ordersCart[orderIndex]};
        orderFound.orderPrice += (product.price * quantity);
        orderFound.quantity += quantity;
        OrdersCart.ordersCart[orderIndex] = {...orderFound};

    } else {
        const order = new Order(product.id, product.title, product.description, product.imageUrl,product.price, quantity, orderPrice, OrdersCart.currentId);
        OrdersCart.currentId++;
        OrdersCart.ordersCart.push(order);    
    }


    return res.status(200).json(OrdersCart.ordersCart);
}

export const removeProductFromCart = (req: Request, res: Response, next: NextFunction) => {
    const orderId = +req.body.orderId;
    let currentTotal = +req.body.currentTotal;

    const orderIndex = OrdersCart.ordersCart.findIndex((order) => order.id === orderId);
    currentTotal -= OrdersCart.ordersCart[orderIndex].orderPrice;
    OrdersCart.ordersCart.splice(orderIndex, 1);

    const cartItems = OrdersCart.ordersCart.length;
    return res.status(200).render('cart', {
        pageTitle: 'Your Cart',
        path: '/cart/orders',
        orders: OrdersCart.ordersCart,
        cartTotal: currentTotal.toFixed(2),
        cartItems: cartItems
    });
}

export const getCart = (req: Request, res: Response, next: NextFunction) => {
    return res.json(OrdersCart.ordersCart);
}

export const getCartPage = (req: Request, res: Response, next: NextFunction) => {
    
    let total = 0;

    OrdersCart.ordersCart.forEach((order) => total += order.orderPrice);
    const cartItems = OrdersCart.ordersCart.length;

    res.status(200).render('cart', {
        pageTitle: 'Your Cart',
        path: '/cart/orders',
        orders: OrdersCart.ordersCart,
        cartTotal: total.toFixed(2),
        cartItems: cartItems
    });
}

export const updateCartOrderQt = (req: Request, res: Response, next: NextFunction) => {
    const orderId = +req.body.orderId;    
    const op = req.body.op;
    const currentTotal = +req.body.currentTotal;

    const orderIndex = OrdersCart.ordersCart.findIndex((order) => order.id === orderId);

    const currentOrder = {
        ...OrdersCart.ordersCart[orderIndex]
    }

    let cartTotal = '0';

    if (op === '+') {
        currentOrder.orderPrice = currentOrder.orderPrice + currentOrder.price;        
        currentOrder.quantity++;
        cartTotal = (currentTotal + currentOrder.price).toFixed(2);        
    } else if (op === '-') {
        currentOrder.orderPrice = currentOrder.orderPrice - currentOrder.price;        
        currentOrder.quantity--;
        cartTotal = (currentTotal - currentOrder.price).toFixed(2);        
    }

    OrdersCart.ordersCart[orderIndex] = {...currentOrder};
    const cartItems = OrdersCart.ordersCart.length;
    return res.status(200).render('cart', {
        pageTitle: 'Your Cart',
        path: '/cart/orders',
        orders: OrdersCart.ordersCart,
        cartTotal: cartTotal,
        cartItems: cartItems
    })
}