import { Application } from 'express';
import productRoutes from './userRoutes'; 

const configureAllRoutes = (app: Application) => {
    productRoutes(app)
}

export default configureAllRoutes;