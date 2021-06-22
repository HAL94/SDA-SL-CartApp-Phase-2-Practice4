import express, { Request, Response, NextFunction} from 'express';
import * as ProductController from '../controllers/products.controller';

export const productsRouter = express.Router();

productsRouter.get('/all', ProductController.getProducts);
productsRouter.get('/:id', ProductController.getProduct);


