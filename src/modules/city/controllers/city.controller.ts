import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { GetCustomerByNameUseCase } from '../../customer/useCases/getByName/getByName.customer.useCase';
import { CreateCityUseCase } from '../useCases/create/create.city.useCase';
import { GetCitiesByUfUseCase } from '../useCases/getByUf/getByUf.city.useCase';
import {
    createCitySchema,
    getCitiesByUfSchema,
    getCityByNameSchema,
} from '../utils/validators';

export class CityController {
    public async store(request: Request, response: Response): Promise<Response> {
        await createCitySchema.validate(request.body, {
            abortEarly: false,
            stripUnknown: true,
        });

        const { body } = request;

        const createCityUseCase = container.resolve(CreateCityUseCase);

        const result = await createCityUseCase.execute({
            ...body,
        });

        return response.status(201).json(result);
    }

    public async getByName(request: Request, response: Response): Promise<Response> {
        const query = await getCityByNameSchema.validate(request.query, {
            abortEarly: false,
            stripUnknown: true,
        });

        const getCustomerByName = container.resolve(GetCustomerByNameUseCase);

        const foundCity = await getCustomerByName.execute(query.name);

        return response.status(200).json(foundCity);
    }

    public async getByUf(request: Request, response: Response): Promise<Response> {
        const params = await getCitiesByUfSchema.validate(request.params, {
            abortEarly: false,
            stripUnknown: true,
        });

        const getCitiesByUf = container.resolve(GetCitiesByUfUseCase);

        const foundCities = await getCitiesByUf.execute(params.uf);

        return response.status(200).json(foundCities);
    }
}
