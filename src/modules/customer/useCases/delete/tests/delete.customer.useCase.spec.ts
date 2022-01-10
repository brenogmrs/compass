import 'reflect-metadata';
import sinon from 'sinon';
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
            full_name: 'bilbo baggins',
            gender: 'M',
            city_id: uuid(),
            birth_date: '1997-06-06',
            id: uuid(),
        };

        const getCustomerByIdUseCaseSpy = jest
            .spyOn(getCustomerByIdUseCase, 'execute')
            .mockResolvedValue(<any>data);

        const customerRepositorySpy = jest
            .spyOn(customerRepository, 'delete')
            .mockResolvedValue(<any>undefined);

        const deleteCustomerUseCaseSpy = jest.spyOn(
            deleteCustomerUseCase,
            'execute',
        );

        await deleteCustomerUseCase.execute(data.id);

        expect(deleteCustomerUseCaseSpy).toHaveBeenNthCalledWith(1, data.id);
        expect(getCustomerByIdUseCaseSpy).toHaveBeenNthCalledWith(1, data.id);
        expect(customerRepositorySpy).toHaveBeenNthCalledWith(1, data);
    });
});
