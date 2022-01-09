import 'reflect-metadata';
import sinon from 'sinon';
import { container } from 'tsyringe';
import { v4 as uuid } from 'uuid';
import { CustomerRepository } from '../../../repositories/customer.repository';
import { GetCustomerByIdUseCase } from '../../getById/getById.customer.useCase';
import { DeleteCustomerUseCase } from '../delete.customer.useCase';

describe('delete customer use case context', () => {
    let customerRepository: sinon.SinonStubbedInstance<CustomerRepository>;
    let deleteCustomerUseCase: DeleteCustomerUseCase;
    let getCustomerByIdUseCase: GetCustomerByIdUseCase;

    beforeEach(() => {
        sinon.restore();
        customerRepository = sinon.createStubInstance(CustomerRepository);

        getCustomerByIdUseCase = new GetCustomerByIdUseCase(customerRepository);
        deleteCustomerUseCase = new DeleteCustomerUseCase(
            customerRepository,
            getCustomerByIdUseCase,
        );
    });
    it('should delete a customer', async () => {
        const data = {
            name: 'name',
            email: 'email',
            password: 'password',
            passwordConfirmation: 'password',
            id: uuid(),
            created_at: new Date(),
            updated_at: new Date(),
        };

        sinon.stub(container, 'resolve').returns(deleteCustomerUseCase);

        sinon.stub(getCustomerByIdUseCase, 'execute').resolves(<any>data);

        customerRepository.delete.resolves(<any>undefined);

        const deleteCustomerUseCaseSpy = jest.spyOn(
            deleteCustomerUseCase,
            'execute',
        );

        await deleteCustomerUseCase.execute(data.id);

        expect(deleteCustomerUseCaseSpy).toHaveBeenNthCalledWith(1, data.id);
    });
});
