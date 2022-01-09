import { Router } from 'express';
import customerRoutes from './modules/customer/routes/customer.routes';
import wishListRoutes from './modules/wishlist/routes/wishList.routes';

const routes = Router();

routes.use('/api/customer', customerRoutes);

routes.use('/api/wishlist', wishListRoutes);

export { routes };
