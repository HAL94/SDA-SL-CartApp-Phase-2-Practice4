import { CommonRoutesConfig } from '../common/common.routes.config';
import express, { Request, Response, NextFunction} from 'express';
import { cartRouter } from './routes/cart.routes';

export class CartRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'CartRoutes');
    }

    configureRoutes() {        
        this.app.use('/cart', cartRouter);
        return this.app;
    }
}