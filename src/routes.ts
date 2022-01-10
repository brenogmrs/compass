import { Router } from 'express';
import customerRoutes from './modules/customer/routes/customer.routes';
import cityRoutes from './modules/city/routes/city.routes';

const routes = Router();

routes.use('/api/customer', customerRoutes);
routes.use('/api/city', cityRoutes);

export { routes };
