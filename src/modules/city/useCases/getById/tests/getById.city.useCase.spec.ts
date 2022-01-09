import 'reflect-metadata';
import sinon from 'sinon';
import { container } from 'tsyringe';
import { v4 as uuid } from 'uuid';
import { CustomerRepository } from '../../../repositories/customer.repository';
import { GetCustomerByIdUseCase } from '../getById.customer.useCase';

describe('Get customer by id use case context', () => {
    let customerRepository: sinon.SinonStubbedInstance<CustomerRepository>;
    let getCustomerByIdUseCase: GetCustomerByIdUseCase;

    beforeEach(() => {
        sinon.restore();
        customerRepository = sinon.createStubInstance(CustomerRepository);
        getCustomerByIdUseCase = new GetCustomerByIdUseCase(customerRepository);
    });
    it('should find a customer by id', async () => {
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

        customerRepository.findById.resolves(<any>data);

        const res = await getCustomerByIdUseCase.execute(data.id);

        expect(res).toEqual(data);
    });

    it('should not find a customer by id', async () => {
        sinon.stub(container, 'resolve').returns(customerRepository);

        customerRepository.findById.resolves(undefined);

        try {
            await getCustomerByIdUseCase.execute('data.id');
        } catch (error: any) {
            expect(error.message).toEqual('Customer not found');
            expect(error.code).toEqual(404);
        }
    });
});
