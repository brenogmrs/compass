import { inject, injectable } from 'tsyringe';
import { ICustomerRepository } from '../../repositories/interfaces/customer.repository.interface';
import { GetCustomerByIdUseCase } from '../getById/getById.customer.useCase';

@injectable()
export class DeleteCustomerUseCase {
    constructor(
        @inject('CustomerRepository')
        private customerRepository: ICustomerRepository,

        @inject('GetCustomerByIdUseCase')
        private getByIdUseCase: GetCustomerByIdUseCase,
    ) {}

    public async execute(id: string): Promise<void> {
        const foundCustomer = await this.getByIdUseCase.execute(id);

        return this.customerRepository.delete(foundCustomer);
    }
}
