import { getRepository, Repository } from 'typeorm';
import { Customer } from '../entities/customer.entity';
import { ICreateCustomer } from '../interfaces/customer.interface';
import { ICustomerRepository } from './interfaces/customer.repository.interface';

export class CustomerRepository implements ICustomerRepository {
    private ormRepository: Repository<Customer>;

    constructor() {
        this.ormRepository = getRepository(Customer);
    }

    public async createAndSave(customerData: ICreateCustomer): Promise<Customer> {
        const customer = this.ormRepository.create(customerData);

        return this.ormRepository.save(customer);
    }

    public async findById(customerId: string): Promise<Customer | undefined> {
        return this.ormRepository.findOne({ id: customerId });
    }

    public async findByEmail(customerEmail: string): Promise<Customer | undefined> {
        return this.ormRepository.findOne({ email: customerEmail });
    }

    public async update(customer: Customer): Promise<Customer> {
        return this.ormRepository.save(customer);
    }

    public async delete(customer: Customer): Promise<void> {
        await this.ormRepository.remove(customer);
    }
}
