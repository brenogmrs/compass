import 'reflect-metadata';
import sinon from 'sinon';
import request from 'supertest';
import { container } from 'tsyringe';
import { v4 as uuid } from 'uuid';
import app from '../../../../app';
import { CreateCustomerUseCase } from '../../useCases/create/create.customer.useCase';
import { DeleteCustomerUseCase } from '../../useCases/delete/delete.customer.useCase';
import { GetCustomerByIdUseCase } from '../../useCases/getById/getById.customer.useCase';
import { GetCustomerByNameUseCase } from '../../useCases/getByName/getByName.customer.useCase';
import { UpdateCustomerUseCase } from '../../useCases/update/update.customer.useCase';

describe('Customer routes tests', () => {
    let createCustomerUseCase: sinon.SinonStubbedInstance<CreateCustomerUseCase>;
    let updateCustomerUseCase: sinon.SinonStubbedInstance<UpdateCustomerUseCase>;
    let getCustomerByIdUseCase: sinon.SinonStubbedInstance<GetCustomerByIdUseCase>;
    let getCustomersByNameUseCase: sinon.SinonStubbedInstance<GetCustomerByNameUseCase>;
    let deleteCustomerUseCase: sinon.SinonStubbedInstance<DeleteCustomerUseCase>;

    beforeEach(() => {
        sinon.restore();
        createCustomerUseCase = sinon.createStubInstance(CreateCustomerUseCase);
        getCustomerByIdUseCase = sinon.createStubInstance(GetCustomerByIdUseCase);
        getCustomersByNameUseCase = sinon.createStubInstance(
            GetCustomerByNameUseCase,
        );
        updateCustomerUseCase = sinon.createStubInstance(UpdateCustomerUseCase);
        deleteCustomerUseCase = sinon.createStubInstance(DeleteCustomerUseCase);
    });

    describe('POST /api/customer', () => {
        it('should create a customer', async () => {
            jest.spyOn(container, 'resolve').mockReturnValue(createCustomerUseCase);

            const data = {
                full_name: 'bilbo baggins',
                gender: 'M',
                city_id: uuid(),
                birth_date: '1997-06-06',
            };

            const createCustomerUseCaseSpy = jest
                .spyOn(createCustomerUseCase, 'execute')
                .mockResolvedValue(<any>data);

            const response = await request(app).post('/api/customer').send(data);

            expect(response.status).toBe(201);
            expect(response.body).toEqual(data);
            expect(createCustomerUseCaseSpy).toBeCalled();
        });

        it('Bad Request - should not create a customer with invalid body', async () => {
            jest.spyOn(container, 'resolve').mockReturnValue(createCustomerUseCase);

            const response = await request(app).post('/api/customer').send();

            expect(response.status).toBe(400);
            expect(response.body.errors).toEqual([
                'The property full_name is required',
                'The property gender is required',
                'The property birth_date is required',
                'The property city_id is required',
            ]);
            expect(createCustomerUseCase.execute.called).toBe(false);
        });

        it('should find a customer by id', async () => {
            jest.spyOn(container, 'resolve').mockReturnValue(getCustomerByIdUseCase);

            const id = uuid();

            const data = {
                full_name: 'bilbo baggins',
                gender: 'M',
                city_id: uuid(),
                birth_date: '1997-06-06',
            };

            const getCustomerByIdUseCaseSpy = jest
                .spyOn(getCustomerByIdUseCase, 'execute')
                .mockResolvedValue(<any>data);

            const response = await request(app).get(`/api/customer/${id}`).send();
            expect(response.status).toBe(200);
            expect(response.body).toEqual(data);
            expect(getCustomerByIdUseCaseSpy).toBeCalled();
        });

        it('Bad request - should not find a customer by id', async () => {
            jest.spyOn(container, 'resolve').mockReturnValue(getCustomerByIdUseCase);

            const id = 'invalid-id';

            const data = {
                full_name: 'bilbo baggins',
                gender: 'M',
                city_id: uuid(),
                birth_date: '1997-06-06',
            };

            const getCustomerByIdUseCaseSpy = jest
                .spyOn(getCustomerByIdUseCase, 'execute')
                .mockResolvedValue(<any>data);

            const response = await request(app).get(`/api/customer/${id}`).send();
            expect(response.status).toBe(400);
            expect(response.body.errors).toEqual(['id must be a valid UUID']);
            expect(getCustomerByIdUseCaseSpy).not.toBeCalled();
        });

        it('should find customers by name', async () => {
            jest.spyOn(container, 'resolve').mockReturnValue(
                getCustomersByNameUseCase,
            );

            const name = 'gandalf the grey';

            const data = {
                full_name: 'bilbo baggins',
                gender: 'M',
                city_id: uuid(),
                birth_date: '1997-06-06',
            };

            const getCustomersByNameUseCaseSpy = jest
                .spyOn(getCustomersByNameUseCase, 'execute')
                .mockResolvedValue(<any>data);

            const response = await request(app)
                .get(`/api/customer/name/?full_name=${name}`)
                .send();

            expect(response.status).toBe(200);
            expect(response.body).toEqual(data);
            expect(getCustomersByNameUseCaseSpy).toBeCalled();
        });

        it('should not find customers by name', async () => {
            jest.spyOn(container, 'resolve').mockReturnValue(
                getCustomersByNameUseCase,
            );

            const name = undefined;

            const data = {
                full_name: 'bilbo baggins',
                gender: 'M',
                city_id: uuid(),
                birth_date: '1997-06-06',
            };

            const getCustomersByNameUseCaseSpy = jest
                .spyOn(getCustomersByNameUseCase, 'execute')
                .mockResolvedValue(<any>data);

            const response = await request(app)
                .get(`/api/customer/name?full_name=`)
                .send();

            expect(response.status).toBe(400);
            expect(response.body.errors).toEqual([
                'The property full_name is required',
            ]);
            expect(getCustomersByNameUseCaseSpy).not.toBeCalled();
        });

        it('should update a customer', async () => {
            jest.spyOn(container, 'resolve').mockReturnValue(updateCustomerUseCase);

            const id = uuid();
            const data = {
                full_name: 'bilbo baggins',
                gender: 'M',
                city_id: uuid(),
                birth_date: '1997-06-06',
            };

            const updateBody = {
                full_name: 'bilbo baggins 1',
            };

            const expectedRes = {
                ...data,
                ...updateBody,
            };

            const updateCustomerUseCaseSpy = jest
                .spyOn(updateCustomerUseCase, 'execute')
                .mockResolvedValue(<any>expectedRes);

            const response = await request(app)
                .put(`/api/customer/${id}`)
                .send(updateBody);

            expect(response.status).toBe(200);
            expect(response.body).toEqual(expectedRes);
            expect(updateCustomerUseCaseSpy).toBeCalled();
        });

        it('Bad Request - should not update a customer with a invalid id', async () => {
            jest.spyOn(container, 'resolve').mockReturnValue(updateCustomerUseCase);

            const id = 'invalid_id';
            const data = {
                full_name: 'bilbo baggins',
                gender: 'M',
                city_id: uuid(),
                birth_date: '1997-06-06',
            };

            const expectedRes = {
                ...data,
            };

            const updateCustomerUseCaseSpy = jest
                .spyOn(updateCustomerUseCase, 'execute')
                .mockResolvedValue(<any>expectedRes);

            const response = await request(app).put(`/api/customer/${id}`).send();

            expect(response.status).toBe(400);
            expect(response.body.errors).toEqual(['id must be a valid UUID']);
            expect(updateCustomerUseCaseSpy).not.toBeCalled();
        });

        it('Bad Request - should not update a customer with a invalid full_name', async () => {
            jest.spyOn(container, 'resolve').mockReturnValue(updateCustomerUseCase);

            const id = uuid();
            const data = {
                full_name: 'bilbo baggins',
                gender: 'M',
                city_id: uuid(),
                birth_date: '1997-06-06',
            };

            const updateBody = {
                full_name: 1,
            };

            const expectedRes = {
                ...data,
                ...updateBody,
            };

            const updateCustomerUseCaseSpy = jest
                .spyOn(updateCustomerUseCase, 'execute')
                .mockResolvedValue(<any>expectedRes);

            const response = await request(app)
                .put(`/api/customer/${id}`)
                .send(updateBody);

            expect(response.status).toBe(400);
            expect(response.body.errors).toEqual([
                'full_name must be a `string` type, but the final value was: `1`.',
            ]);
            expect(updateCustomerUseCaseSpy).not.toBeCalled();
        });

        it('should delete a customer', async () => {
            jest.spyOn(container, 'resolve').mockReturnValue(deleteCustomerUseCase);

            const id = uuid();

            const deleteCustomerUseCaseSpy = jest
                .spyOn(deleteCustomerUseCase, 'execute')
                .mockResolvedValue(<any>'deleted');

            const response = await request(app).delete(`/api/customer/${id}`).send();

            expect(response.status).toBe(204);
            expect(deleteCustomerUseCaseSpy).toBeCalled();
        });

        it('Bad request - should delete a customer', async () => {
            jest.spyOn(container, 'resolve').mockReturnValue(deleteCustomerUseCase);

            const id = 'invalid-id';

            const deleteCustomerUseCaseSpy = jest
                .spyOn(deleteCustomerUseCase, 'execute')
                .mockResolvedValue(<any>'deleted');

            const response = await request(app).delete(`/api/customer/${id}`).send();

            expect(response.status).toBe(400);
            expect(response.body.errors).toEqual(['id must be a valid UUID']);
            expect(deleteCustomerUseCaseSpy).not.toBeCalled();
        });
    });
});
