import { inject, injectable } from 'tsyringe';
import { CustomerEntity } from '../../entities/customer.entity';
import { ICreateCustomer } from '../../interfaces/customer.interface';
import { ICustomerRepository } from '../../repositories/interfaces/customer.repository.interface';

@injectable()
export class CreateCustomerUseCase {
    constructor(
        @inject('CustomerRepository')
        private customerRepository: ICustomerRepository,
    ) {}

    public async execute(customerData: ICreateCustomer): Promise<CustomerEntity> {
        //verificar se a cidade existe
        //parsear full_name para upper case

        const { full_name } = customerData;
        const upperCaseFullName = full_name.toUpperCase();

        return this.customerRepository.createAndSave({
            ...customerData,
            full_name: upperCaseFullName,
        });
    }
}
