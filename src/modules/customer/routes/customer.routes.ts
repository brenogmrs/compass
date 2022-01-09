import { Router } from 'express';
import { CustomerController } from '../controllers/customer.controller';

const routes = Router();

const customerController = new CustomerController();

routes.post('/', customerController.store);

routes.get('/:id', customerController.getById);

routes.get('name', customerController.getByName);

routes.put('/:id', customerController.update);

routes.delete('/:id', customerController.delete);

export default routes;
