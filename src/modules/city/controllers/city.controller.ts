import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateCityUseCase } from '../useCases/create/create.city.useCase';
import { GetCityByNameUseCase } from '../useCases/getByName/getByName.city.useCase';
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

        const getCityByName = container.resolve(GetCityByNameUseCase);

        const foundCity = await getCityByName.execute(query.name);

        return response.status(200).json(foundCity);
    }

    public async getByUf(request: Request, response: Response): Promise<Response> {
        const query = await getCitiesByUfSchema.validate(request.query, {
            abortEarly: false,
            stripUnknown: true,
        });

        const getCitiesByUf = container.resolve(GetCitiesByUfUseCase);

        const foundCities = await getCitiesByUf.execute(query.uf);

        return response.status(200).json(foundCities);
    }
}
