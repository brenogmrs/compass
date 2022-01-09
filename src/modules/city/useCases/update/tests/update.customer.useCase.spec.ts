import 'reflect-metadata';
import sinon from 'sinon';
import { container } from 'tsyringe';
import { v4 as uuid } from 'uuid';
import { CustomerRepository } from '../../../repositories/customer.repository';
import { GetCustomerByIdUseCase } from '../../getById/getById.customer.useCase';
import { UpdateCustomerUseCase } from '../update.customer.useCase';

describe('update customer use case context', () => {
    let customerRepository: sinon.SinonStubbedInstance<CustomerRepository>;
    let updateCustomerUseCase: UpdateCustomerUseCase;
    let getCustomerByIdUseCase: GetCustomerByIdUseCase;

    beforeEach(() => {
        sinon.restore();
        customerRepository = sinon.createStubInstance(CustomerRepository);

        getCustomerByIdUseCase = new GetCustomerByIdUseCase(customerRepository);
        updateCustomerUseCase = new UpdateCustomerUseCase(
            customerRepository,
            getCustomerByIdUseCase,
        );
    });
    it('should update customer', async () => {
        const data = {
            name: 'name',
            email: 'email',
            password: 'password',
            passwordConfirmation: 'password',
            id: uuid(),
            created_at: new Date(),
            updated_at: new Date(),
        };

        const updateBody = {
            name: 'update name',
        };

        const expectedRes = {
            ...data,
            ...updateBody,
        };

        sinon.stub(container, 'resolve').returns(updateCustomerUseCase);

        sinon.stub(getCustomerByIdUseCase, 'execute').resolves(<any>data);

        customerRepository.update.resolves(<any>expectedRes);

        const res = await updateCustomerUseCase.execute(data.id, updateBody);

        expect(res).toEqual(expectedRes);
    });

    it('should update customer with existing email', async () => {
        expect.hasAssertions();

        const data = {
            name: 'name',
            email: 'email',
            password: 'password',
            passwordConfirmation: 'password',
            id: uuid(),
            created_at: new Date(),
            updated_at: new Date(),
        };

        const updateBody = {
            email: 'email',
        };

        const expectedRes = {
            ...data,
            ...updateBody,
        };

        sinon.stub(container, 'resolve').returns(updateCustomerUseCase);

        sinon.stub(getCustomerByIdUseCase, 'execute').resolves(<any>data);

        customerRepository.findByEmail.resolves(<any>data);
        customerRepository.update.resolves(<any>expectedRes);

        try {
            await updateCustomerUseCase.execute(data.id, updateBody);
        } catch (error: any) {
            expect(error.message).toEqual('Email address already exists');
            expect(error.code).toEqual(409);
        }
    });
});
