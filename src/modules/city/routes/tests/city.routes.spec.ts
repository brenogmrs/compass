import 'reflect-metadata';
import sinon from 'sinon';
import request from 'supertest';
import { container } from 'tsyringe';
import { v4 as uuid } from 'uuid';
import app from '../../../../app';
import { Customer } from '../../entities/customer.entity';
import { CreateCustomerUseCase } from '../../useCases/create/create.customer.useCase';
import { DeleteCustomerUseCase } from '../../useCases/delete/delete.customer.useCase';
import { GetCustomerByIdUseCase } from '../../useCases/getById/getById.customer.useCase';
import { UpdateCustomerUseCase } from '../../useCases/update/update.customer.useCase';

describe('Customer routes tests', () => {
    let createCustomerUseCase: sinon.SinonStubbedInstance<CreateCustomerUseCase>;
    let updateCustomerUseCase: sinon.SinonStubbedInstance<UpdateCustomerUseCase>;
    let getCustomerByIdUseCase: sinon.SinonStubbedInstance<GetCustomerByIdUseCase>;
    let deleteCustomerUseCase: sinon.SinonStubbedInstance<DeleteCustomerUseCase>;

    beforeEach(() => {
        sinon.restore();
        createCustomerUseCase = sinon.createStubInstance(CreateCustomerUseCase);
        updateCustomerUseCase = sinon.createStubInstance(UpdateCustomerUseCase);
        getCustomerByIdUseCase = sinon.createStubInstance(GetCustomerByIdUseCase);
        deleteCustomerUseCase = sinon.createStubInstance(DeleteCustomerUseCase);
    });

    describe('POST /api/customer', () => {
        it('should create a customer', async () => {
            sinon.stub(container, 'resolve').returns(createCustomerUseCase);

            const customer = {
                name: 'any name',
                email: 'anyemail@email.com',
                password: 'any_password',
            };

            const sut = {
                ...customer,
                passwordConfirmation: 'any_password',
            };

            const { password, ...expectedRes } = customer;

            createCustomerUseCase.execute.returns(
                new Promise(resolve => resolve(customer as Customer)),
            );

            const response = await request(app).post('/api/customer').send(sut);

            expect(response.status).toBe(201);
            expect(response.body).toEqual(expectedRes);
            expect(createCustomerUseCase.execute.called).toBe(true);
        });

        it('Bad Request - should not create a customer with invalid body', async () => {
            sinon.stub(container, 'resolve').returns(createCustomerUseCase);

            const response = await request(app).post('/api/customer').send();

            expect(response.status).toBe(400);
            expect(response.body.errors).toEqual([
                'The property name is required',
                'The property email is required',
                'The property passwordConfirmation is required',
                'The property password is required',
            ]);
            expect(createCustomerUseCase.execute.called).toBe(false);
        });
    });
});
