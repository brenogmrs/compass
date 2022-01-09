import { getRepository, Repository } from 'typeorm';
import { CustomerEntity } from '../entities/customer.entity';
import { ICreateCustomer } from '../interfaces/customer.interface';
import { ICustomerRepository } from './interfaces/customer.repository.interface';

export class CustomerRepository implements ICustomerRepository {
    private ormRepository: Repository<CustomerEntity>;

    constructor() {
        this.ormRepository = getRepository(CustomerEntity);
    }

    public async createAndSave(
        customerData: ICreateCustomer,
    ): Promise<CustomerEntity> {
        const customer = this.ormRepository.create(customerData);

        return this.ormRepository.save(customer);
    }

    public async findById(customerId: string): Promise<CustomerEntity | undefined> {
        return this.ormRepository.findOne({ id: customerId });
    }

    public async findByName(customerName: string): Promise<CustomerEntity[]> {
        return this.ormRepository.find({ full_name: customerName });
    }

    public async update(customer: CustomerEntity): Promise<CustomerEntity> {
        return this.ormRepository.save(customer);
    }

    public async delete(customer: CustomerEntity): Promise<void> {
        await this.ormRepository.remove(customer);
    }
}
