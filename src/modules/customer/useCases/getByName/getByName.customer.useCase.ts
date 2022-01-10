import { inject, injectable } from 'tsyringe';
import { HttpError } from '../../../../common/errors/http.error';
import { CustomerEntity } from '../../entities/customer.entity';
import { ICustomerRepository } from '../../repositories/interfaces/customer.repository.interface';
import { calculateAge } from '../../utils/functions/calculateAge';

@injectable()
export class GetCustomerByNameUseCase {
    constructor(
        @inject('CustomerRepository')
        private customerRepository: ICustomerRepository,
    ) {}

    public async execute(customerName: string): Promise<CustomerEntity[]> {
        const foundCustomerByName = await this.customerRepository.findByName(
            customerName,
        );

        if (foundCustomerByName.length <= 0) {
            throw new HttpError('No customer with this name was found', 404);
        }

        return foundCustomerByName.map(item => ({
            ...item,
            age: calculateAge(item.birth_date),
        }));
    }
}
