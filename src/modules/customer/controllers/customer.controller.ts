import { Request, Response } from 'express';

import { container } from 'tsyringe';
import { idParamSchema } from '../../../common/validators';

import { CreateCustomerUseCase } from '../useCases/create/create.customer.useCase';
import { DeleteCustomerUseCase } from '../useCases/delete/delete.customer.useCase';
import { GetCustomerByIdUseCase } from '../useCases/getById/getById.customer.useCase';
import { UpdateCustomerUseCase } from '../useCases/update/update.customer.useCase';
import { createCustomerSchema, updateCustomerSchema } from '../utils/validators';

export class CustomerController {
    public async store(request: Request, response: Response): Promise<Response> {
        await createCustomerSchema.validate(request.body, {
            abortEarly: false,
            stripUnknown: true,
        });

        const { name, email, password, passwordConfirmation } = request.body;

        const createCustomerUseCase = container.resolve(CreateCustomerUseCase);

        const result = await createCustomerUseCase.execute({
            name,
            email,
            password,
            passwordConfirmation,
        });

        const { password: createdPassword, ...customerCreated } = result;

        return response.status(201).json(customerCreated);
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
