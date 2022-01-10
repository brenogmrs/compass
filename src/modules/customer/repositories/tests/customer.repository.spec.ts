import { getConnection } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { getDatabaseConfigConnectionQA } from '../../../../config/database/connection';
import { CustomerEntity } from '../../entities/customer.entity';
import { CustomerRepository } from '../customer.repository';

describe('customer repository context', () => {
    let customerRepository: CustomerRepository;

    beforeEach(async () => {
        await getConnection().query('PRAGMA foreign_keys=OFF');
    });

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
            full_name: 'bilbo baggins',
            gender: 'M',
            city_id: uuid(),
            birth_date: '1997-06-06',
        };

        const res = await customerRepository.createAndSave(data);

        expect(res).toEqual(expect.objectContaining(data));
    });

    it('should find a customer by id', async () => {
        const data = {
            full_name: 'bilbo baggins',
            gender: 'M',
            city_id: uuid(),
            birth_date: '1997-06-06',
        };

        const createdCustomer = await customerRepository.createAndSave(data);

        const foundCustomer = await customerRepository.findById(createdCustomer.id);

        expect(foundCustomer!.id).toEqual(createdCustomer.id);
    });

    it('should find a customers by name', async () => {
        const data = {
            full_name: 'bilbo baggins',
            gender: 'M',
            city_id: uuid(),
            birth_date: '1997-06-06',
        };

        const createdCustomer = await customerRepository.createAndSave(data);

        const [foundCustomer] = await customerRepository.findByName(
            createdCustomer.full_name,
        );

        const { created_at, updated_at, ...customerData } = foundCustomer;
        expect(foundCustomer).toEqual(expect.objectContaining(customerData));
        expect(created_at).toBeDefined();
        expect(updated_at).toBeDefined();
    });
});
