import 'reflect-metadata';
import sinon from 'sinon';
import { v4 as uuid } from 'uuid';
import { CustomerRepository } from '../../../repositories/customer.repository';
import { calculateAge } from '../../../utils/functions/calculateAge';
import { GetCustomerByNameUseCase } from '../getByName.customer.useCase';

describe('Get customer by name use case context', () => {
    let customerRepository: sinon.SinonStubbedInstance<CustomerRepository>;
    let getCustomerByNameUseCase: GetCustomerByNameUseCase;

    beforeEach(() => {
        sinon.restore();
        customerRepository = sinon.createStubInstance(CustomerRepository);
        getCustomerByNameUseCase = new GetCustomerByNameUseCase(customerRepository);
    });

    it('should find customers by name', async () => {
        const data = [
            {
                full_name: 'bilbo baggins',
                gender: 'M',
                city_id: uuid(),
                birth_date: '1996-06-06',
                id: uuid(),
            },
        ];

        const customerRepositorySpy = jest
            .spyOn(customerRepository, 'findByName')
            .mockResolvedValue(<any>data);

        const expectedRes = data.map(item => {
            return {
                ...item,
                age: calculateAge(item.birth_date),
            };
        });

        const res = await getCustomerByNameUseCase.execute(data[0].full_name);

        expect(res).toEqual(expectedRes);
        expect(customerRepositorySpy).toHaveBeenNthCalledWith(
            1,
            data[0].full_name.toUpperCase(),
        );
    });

    it('should not find customers by name', async () => {
        expect.hasAssertions();

        jest.spyOn(customerRepository, 'findByName').mockResolvedValue(<any>[]);

        try {
            await getCustomerByNameUseCase.execute('data.full_name');
        } catch (error: any) {
            expect(error.message).toEqual('No customer with this name was found');
            expect(error.code).toEqual(404);
        }
    });
});
