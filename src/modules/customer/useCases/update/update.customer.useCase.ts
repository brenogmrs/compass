import { inject, injectable } from 'tsyringe';
import { CustomerEntity } from '../../entities/customer.entity';
import { IUpdateCustomer } from '../../interfaces/customer.interface';
import { ICustomerRepository } from '../../repositories/interfaces/customer.repository.interface';
import { GetCustomerByIdUseCase } from '../getById/getById.customer.useCase';

@injectable()
export class UpdateCustomerUseCase {
    constructor(
        @inject('CustomerRepository')
        private customerRepository: ICustomerRepository,

        @inject('GetCustomerByIdUseCase')
        private getByIdUseCase: GetCustomerByIdUseCase,
    ) {}

    public async execute(
        id: string,
        customerData: IUpdateCustomer,
    ): Promise<CustomerEntity> {
        const foundCustomer = await this.getByIdUseCase.execute(id);

        const updatedCustomer = {
            ...foundCustomer,
            ...customerData,
        };

        return this.customerRepository.update(updatedCustomer);
    }
}
