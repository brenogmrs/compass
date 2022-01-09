import { getConnection } from 'typeorm';
import { getDatabaseConfigConnectionQA } from '../../../../config/database/connection';
import { CustomerEntity } from '../../entities/customer.entity';
import { CustomerRepository } from '../customer.repository';

describe('customer repository context', () => {
    let customerRepository: CustomerRepository;

    beforeAll(async () => {
        await getDatabaseConfigConnectionQA();

        customerRepository = new CustomerRepository();
    });

    afterEach(async () => {
        await getConnection().manager.clear(CustomerEntity);
        jest.resetAllMocks();
    });

    afterAll(async () => {
        await getConnection().close();
    });

    it('should create a customer', async () => {
        const data = {
            name: 'Gandalf',
            email: 'gandalfthegrey@teste.com',
            password: 'jumpufools',
        };

        const res = await customerRepository.createAndSave(data);

        expect(res).toEqual(expect.objectContaining(data));
    });

    it('should find a customer by id', async () => {
        const data = {
            name: 'bilbo',
            email: 'bilbobaggings@teste.com',
            password: 'holeintheground',
        };

        const createdCustomer = await customerRepository.createAndSave(data);

        const foundCustomer = await customerRepository.findById(createdCustomer.id);

        expect(foundCustomer!.id).toEqual(createdCustomer.id);
    });

    it('should find a customer by email', async () => {
        const data = {
            name: 'Gandalf',
            email: 'gandalfthegrey@teste.com',
            password: 'jumpufools',
        };

        const createdCustomer = await customerRepository.createAndSave(data);

        const foundCustomer = await customerRepository.findByEmail(
            createdCustomer.email,
        );

        expect(foundCustomer).toEqual({ ...createdCustomer, wishList: [] });
    });

    it('should update customer', async () => {
        const data = {
            name: 'Gandalf',
            email: 'gandalfthegrey@teste.com',
            password: 'jumpufools',
        };

        const updateBody = {
            name: 'Gandalf the wite',
            email: 'gandalfthewhite@teste.com',
        };

        const createdCustomer = await customerRepository.createAndSave(data);

        const expectedRes = {
            ...createdCustomer,
            ...updateBody,
        };

        const updateCustomer = await customerRepository.update(expectedRes);

        expect(updateCustomer).toEqual(expectedRes);
    });

    it('should delete a customer', async () => {
        const data = {
            name: 'Gandalf',
            email: 'gandalfthegrey@teste.com',
            password: 'jumpufools',
        };

        const createdCustomer = await customerRepository.createAndSave(data);

        await customerRepository.delete(createdCustomer);

        const foundCustomer = await customerRepository.findById(createdCustomer.id);

        expect(foundCustomer).toBeUndefined();
    });
});
