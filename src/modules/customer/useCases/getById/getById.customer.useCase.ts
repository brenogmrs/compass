import { inject, injectable } from 'tsyringe';
import { HttpError } from '../../../../common/errors/http.error';
import { Customer } from '../../entities/customer.entity';
import { ICustomerRepository } from '../../repositories/interfaces/customer.repository.interface';

@injectable()
export class GetCustomerByIdUseCase {
    constructor(
        @inject('CustomerRepository')
        private customerRepository: ICustomerRepository,
    ) {}

    public async execute(customerId: string): Promise<Customer> {
        const foundCustomerByEmail = await this.customerRepository.findById(
            customerId,
        );

        if (!foundCustomerByEmail) {
            throw new HttpError('Customer not found', 404);
        }

        return foundCustomerByEmail;
    }
}
