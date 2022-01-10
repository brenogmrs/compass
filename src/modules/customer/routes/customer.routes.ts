import { Router } from 'express';
import { CustomerController } from '../controllers/customer.controller';

const routes = Router();

const customerController = new CustomerController();

routes.post('/', customerController.store);

routes.get('/name', customerController.getByName);

routes.get('/:id', customerController.getById);

routes.put('/:id', customerController.update);

routes.delete('/:id', customerController.delete);

export default routes;
