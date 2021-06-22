import {CommonRoutesConfig} from '../common/common.routes.config';
import express, { Request, Response, NextFunction} from 'express';
import { productsRouter } from './routes/products.routes';

export class ProductsRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'ProductsRoutes');
    }

    configureRoutes() {        
        this.app.use(`/products`, productsRouter);
        return this.app;
    }
}