import { Router } from 'express';
import { CityController } from '../controllers/city.controller';

const routes = Router();

const customerController = new CityController();

routes.post('/', customerController.store);

routes.get('/name', customerController.getByName);

routes.get('/uf', customerController.getByUf);

export default routes;
