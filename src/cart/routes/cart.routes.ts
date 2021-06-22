import express from 'express';
import * as CartController from '../controllers/cart.controller';

export const cartRouter = express.Router();

cartRouter.get('/fetch', CartController.getCart);
cartRouter.get('/orders', CartController.getCartPage);
cartRouter.post('/add', CartController.addProuctToCart);
cartRouter.post('/remove', CartController.removeProductFromCart);
cartRouter.post('/orders/update', CartController.updateCartOrderQt);

cartRouter.get('*', function(req, res, next){
    res.redirect('cart/orders');
    // next();
});

