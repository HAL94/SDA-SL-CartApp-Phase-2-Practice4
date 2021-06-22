import { Product } from '../models/product.interface';
import { DbProductReader } from "../models/product-db-reader.model";
import { OrdersCart } from '../../data/orders-cart';
import { Request, Response, NextFunction } from 'express';

export const getProducts = (req: Request, res: Response, next: NextFunction) => {
  const dbProductReader = new DbProductReader();
  dbProductReader.read().then((products: Product[]) => {
      const cartTotal = OrdersCart.getCurrentTotal();
      const cartItems = OrdersCart.ordersCart.length;
      res.render('shop', {
        pageTitle: 'All Products',
        path: '/',
        cartTotal: cartTotal.toFixed(2),
        cartItems: cartItems,
        prods: products,
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true,
      });
  }).catch(error => {
    console.log('get_all_products', error);
  })
};

export const getProduct = async (req: Request, res: Response, next: NextFunction) => {
  const dbProductReader = new DbProductReader();
  let productFetchError = null;
  let result = await dbProductReader.readById(+req.params.id)
    .catch(error => productFetchError = error);
  // console.log(result);

  if (productFetchError) {
    res.status(500).json({message: 'An error has occured, cannot fetch product'});
  } else {    
      let product: Product = {
        ...result
      };
      // return res.status(200).json(result);
      const cartTotal = OrdersCart.getCurrentTotal();
      const cartItems = OrdersCart.ordersCart.length;
      res.status(200).render('product', {
        pageTitle: product.title,
        product: product,
        path: '/' + product.id,
        cartTotal: cartTotal.toFixed(2),
        cartItems: cartItems
      })
      
  }

}
