import 'reflect-metadata';
import sinon from 'sinon';
import { v4 as uuid } from 'uuid';
import { CustomerRepository } from '../../../repositories/customer.repository';
import { calculateAge } from '../../../utils/functions/calculateAge';
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
            full_name: 'bilbo baggins',
            gender: 'M',
            city_id: uuid(),
            birth_date: '1996-06-06',
            id: uuid(),
        };

        const customerRepositorySpy = jest
            .spyOn(customerRepository, 'findById')
            .mockResolvedValue(<any>data);

        const expectedRes = {
            ...data,
            age: calculateAge(data.birth_date),
        };

        const res = await getCustomerByIdUseCase.execute(data.id);

        expect(res).toEqual(expectedRes);
        expect(customerRepositorySpy).toHaveBeenNthCalledWith(1, data.id);
    });

    it('should not find a customer by id', async () => {
        expect.hasAssertions();

        jest.spyOn(customerRepository, 'findById').mockResolvedValue(<any>undefined);

        try {
            await getCustomerByIdUseCase.execute('data.id');
        } catch (error: any) {
            expect(error.message).toEqual('Customer not found');
            expect(error.code).toEqual(404);
        }
    });
});
