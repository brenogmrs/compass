import { Router } from 'express';
import { CityController } from '../controllers/city.controller';

const routes = Router();

const cityController = new CityController();

routes.post('/', cityController.store);

routes.get('/name', cityController.getByName);

routes.get('/uf', cityController.getByUf);

export default routes;
