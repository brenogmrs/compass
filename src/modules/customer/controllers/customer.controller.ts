import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { parse } from 'url';
import { idParamSchema } from '../../../common/validators';
import { CreateCustomerUseCase } from '../useCases/create/create.customer.useCase';
import { DeleteCustomerUseCase } from '../useCases/delete/delete.customer.useCase';
import { GetCustomerByIdUseCase } from '../useCases/getById/getById.customer.useCase';
import { GetCustomerByNameUseCase } from '../useCases/getByName/getByName.customer.useCase';
import { UpdateCustomerUseCase } from '../useCases/update/update.customer.useCase';
import {
    createCustomerSchema,
    findCustomerByNameSchema,
    updateCustomerSchema,
} from '../utils/validators';

export class CustomerController {
    public async store(request: Request, response: Response): Promise<Response> {
        await createCustomerSchema.validate(request.body, {
            abortEarly: false,
            stripUnknown: true,
        });

        const { body } = request;

        const createCustomerUseCase = container.resolve(CreateCustomerUseCase);

        const result = await createCustomerUseCase.execute(body);

        return response.status(201).json(result);
    }

    public async getById(request: Request, response: Response): Promise<Response> {
        await idParamSchema.validate(request.params, {
            abortEarly: false,
            stripUnknown: true,
        });

        const { id } = request.params;

        const getCustomerById = container.resolve(GetCustomerByIdUseCase);

        const foundCustomer = await getCustomerById.execute(id);

        return response.status(200).json(foundCustomer);
    }

    public async getByName(request: Request, response: Response): Promise<Response> {
        const query = await findCustomerByNameSchema.validate(request.query, {
            abortEarly: false,
            stripUnknown: true,
        });

        const getCustomerByName = container.resolve(GetCustomerByNameUseCase);

        const foundCustomer = await getCustomerByName.execute(query.name);

        return response.status(200).json(foundCustomer);
    }

    public async update(request: Request, response: Response): Promise<Response> {
        await updateCustomerSchema.validate(request.body, {
            abortEarly: false,
            stripUnknown: true,
        });

        await idParamSchema.validate(request.params, {
            abortEarly: false,
            stripUnknown: true,
        });

        const { id } = request.params;
        const updateBody = request.body;

        const getCustomerById = container.resolve(UpdateCustomerUseCase);

        const updatedCustomer = await getCustomerById.execute(id, updateBody);

        return response.status(200).json(updatedCustomer);
    }

    public async delete(request: Request, response: Response): Promise<Response> {
        await idParamSchema.validate(request.params, {
            abortEarly: false,
            stripUnknown: true,
        });

        const { id } = request.params;

        const deleteCustomerUseCase = container.resolve(DeleteCustomerUseCase);

        await deleteCustomerUseCase.execute(id);

        return response.status(204).json();
    }
}
