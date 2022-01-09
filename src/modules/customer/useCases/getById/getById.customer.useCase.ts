import { inject, injectable } from 'tsyringe';
import { HttpError } from '../../../../common/errors/http.error';
import { IFindCustomerResponse } from '../../interfaces/customer.interface';
import { ICustomerRepository } from '../../repositories/interfaces/customer.repository.interface';

@injectable()
export class GetCustomerByIdUseCase {
    constructor(
        @inject('CustomerRepository')
        private customerRepository: ICustomerRepository,
    ) {}

    public async execute(customerId: string): Promise<IFindCustomerResponse> {
        const foundCustomerByEmail = await this.customerRepository.findById(
            customerId,
        );

        if (!foundCustomerByEmail) {
            throw new HttpError('Customer not found', 404);
        }

        const age = this.calculateAge(foundCustomerByEmail.birth_date);

        return {
            ...foundCustomerByEmail,
            age,
        };
    }

    public calculateAge(birth_date: string): number {
        return Math.floor(
            (Date.now() - new Date(birth_date).getTime()) /
                1000 /
                60 /
                60 /
                24 /
                365,
        );
    }
}
