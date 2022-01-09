import 'reflect-metadata';
import sinon from 'sinon';
import { container } from 'tsyringe';
import { v4 as uuid } from 'uuid';
import { CustomerRepository } from '../../../repositories/customer.repository';
import { HashPassword } from '../../../utils/hashPassword';
import { CreateCustomerUseCase } from '../create.customer.useCase';

describe('Create customer use case context', () => {
    let customerRepository: sinon.SinonStubbedInstance<CustomerRepository>;
    let hashPassword: sinon.SinonStubbedInstance<HashPassword>;
    let createCustomerUseCase: CreateCustomerUseCase;

    beforeEach(() => {
        sinon.restore();
        customerRepository = sinon.createStubInstance(CustomerRepository);
        hashPassword = sinon.createStubInstance(HashPassword);

        createCustomerUseCase = new CreateCustomerUseCase(
            customerRepository,
            hashPassword,
        );
    });

    it('should create a customer', async () => {
        const data = {
            name: 'name',
            email: 'email',
            password: 'password',
            passwordConfirmation: 'password',
            id: uuid(),
            created_at: new Date(),
            updated_at: new Date(),
        };

        const expectedRes = {
            ...data,
            password: 'hashpassword',
        };

        sinon.stub(container, 'resolve').returns(customerRepository);

        customerRepository.createAndSave.resolves(<any>expectedRes);

        customerRepository.findById.resolves(undefined);

        hashPassword.generate.resolves('hashpassword');

        const res = await createCustomerUseCase.execute(data);

        expect(res).toEqual(expectedRes);
    });

    it('should not create a customer with different password and passwordConfirmation', async () => {
        const data = {
            name: 'name',
            email: 'email',
            password: 'password',
            passwordConfirmation: 'passwordConfirmation',
            id: uuid(),
            created_at: new Date(),
            updated_at: new Date(),
        };

        sinon.stub(container, 'resolve').returns(customerRepository);

        customerRepository.findById.resolves(undefined);

        hashPassword.generate.resolves('hashpassword');

        try {
            await createCustomerUseCase.execute(data);
        } catch (error: any) {
            expect(error.message).toEqual(
                'The password and passwordConfirmation must be the same',
            );
            expect(error.code).toEqual(400);
        }
    });

    it('should not create a customer with existing email', async () => {
        const data = {
            name: 'name',
            email: 'email',
            password: 'password',
            passwordConfirmation: 'password',
            id: uuid(),
            created_at: new Date(),
            updated_at: new Date(),
        };

        sinon.stub(container, 'resolve').returns(customerRepository);

        customerRepository.findByEmail.resolves(<any>data);

        try {
            await createCustomerUseCase.execute(data);
        } catch (error: any) {
            expect(error.message).toEqual('Email address already exists');
            expect(error.code).toEqual(409);
        }
    });
});
