import express, { Request, Response, NextFunction } from 'express';
import { CommonRoutesConfig } from './common/common.routes.config';
import { CartRoutes } from './cart/cart.routes.config';
import { ProductsRoutes } from './products/products.routes.config';

import * as bodyParser from 'body-parser';
import * as path from 'path';

const app: express.Application = express();
const port = 3000;
const routes: CommonRoutesConfig[] = [];

app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname + '/views'));

app.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.redirect("products/all");
});


routes.push(new CartRoutes(app));
routes.push(new ProductsRoutes(app));

// app.get('*', function(req, res){
//     res.status(404).json('what???');
// });
const message = `Server started at port ${port}`;

app.listen(port, () => {
    routes.forEach((route: CommonRoutesConfig) => {
        console.log(`Routes configured for ${route.getName()}`);
    });
    // our only exception to avoiding console.log(), because we
    // always want to know when the server is done starting up
    console.log(message);
});