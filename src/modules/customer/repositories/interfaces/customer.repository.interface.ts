import { CustomerEntity } from '../../entities/customer.entity';
import { ICreateCustomer } from '../../interfaces/customer.interface';

export interface ICustomerRepository {
    createAndSave(customerData: ICreateCustomer): Promise<CustomerEntity>;
    findByName(customerName: string): Promise<CustomerEntity[]>;
    findById(customerId: string): Promise<CustomerEntity | undefined>;
    delete(customer: CustomerEntity): Promise<void>;
    update(customer: CustomerEntity): Promise<CustomerEntity>;
}
