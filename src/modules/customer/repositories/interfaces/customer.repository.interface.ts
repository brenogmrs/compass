import { Customer } from '../../entities/customer.entity';
import { ICreateCustomer } from '../../interfaces/customer.interface';

export interface ICustomerRepository {
    createAndSave(customerData: ICreateCustomer): Promise<Customer>;
    findByEmail(customerEmail: string): Promise<Customer | undefined>;
    findById(customerId: string): Promise<Customer | undefined>;
    delete(customer: Customer): Promise<void>;
    update(customer: Customer): Promise<Customer>;
}
