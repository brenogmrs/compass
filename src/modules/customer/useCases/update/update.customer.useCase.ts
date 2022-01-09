import { inject, injectable } from 'tsyringe';
import { HttpError } from '../../../../common/errors/http.error';
import { Customer } from '../../entities/customer.entity';
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
    ): Promise<Customer> {
        const foundCustomer = await this.getByIdUseCase.execute(id);

        if (customerData.email) {
            const foundCustomerByEmail = await this.customerRepository.findByEmail(
                customerData.email,
            );

            if (foundCustomerByEmail) {
                throw new HttpError('Email address already exists', 409);
            }
        }

        const updatedCustomer = {
            ...foundCustomer,
            ...customerData,
        };

        return this.customerRepository.update(updatedCustomer);
    }
}
