import { inject, injectable } from 'tsyringe';
import { GetCityByIdUseCase } from '../../../city/useCases/getById/getById.city.useCase';
import { CustomerEntity } from '../../entities/customer.entity';
import { ICreateCustomer } from '../../interfaces/customer.interface';
import { ICustomerRepository } from '../../repositories/interfaces/customer.repository.interface';

@injectable()
export class CreateCustomerUseCase {
    constructor(
        @inject('CustomerRepository')
        private customerRepository: ICustomerRepository,

        @inject('GetCityByIdUseCase')
        private getCityByIdUseCase: GetCityByIdUseCase,
    ) {}

    public async execute(customerData: ICreateCustomer): Promise<CustomerEntity> {
        const { full_name, city_id } = customerData;

        await this.getCityByIdUseCase.execute(city_id);

        const upperCaseFullName = full_name.toUpperCase();

        return this.customerRepository.createAndSave({
            ...customerData,
            full_name: upperCaseFullName,
        });
    }
}
