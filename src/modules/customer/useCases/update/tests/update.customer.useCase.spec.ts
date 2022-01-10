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
        const id = uuid();

        const data = {
            full_name: 'bilbo baggins',
            gender: 'M',
            city_id: uuid(),
            birth_date: '1997-06-06',
        };

        const updateBody = {
            name: 'update name',
        };

        const expectedRes = {
            ...data,
            ...updateBody,
        };

        const getCustomerByIdUseCaseSpy = jest
            .spyOn(getCustomerByIdUseCase, 'execute')
            .mockResolvedValue(<any>data);

        const customerRepositorySpy = jest
            .spyOn(customerRepository, 'update')
            .mockResolvedValue(<any>expectedRes);

        const res = await updateCustomerUseCase.execute(id, updateBody);

        expect(res).toEqual(expectedRes);
        expect(getCustomerByIdUseCaseSpy).toHaveBeenNthCalledWith(1, id);
        expect(customerRepositorySpy).toHaveBeenNthCalledWith(1, expectedRes);
    });
});
