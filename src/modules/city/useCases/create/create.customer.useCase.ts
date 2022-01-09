import { inject, injectable } from 'tsyringe';
import { HttpError } from '../../../../common/errors/http.error';
import { Customer } from '../../entities/customer.entity';
import { ICreateCustomer } from '../../interfaces/customer.interface';
import { ICustomerRepository } from '../../repositories/interfaces/customer.repository.interface';
import { IHashPassword } from '../../utils/hashPassword/interfaces/hashPassword.interface';

@injectable()
export class CreateCustomerUseCase {
    constructor(
        @inject('CustomerRepository')
        private customerRepository: ICustomerRepository,

        @inject('HashPassword')
        private hashPassword: IHashPassword,
    ) {}

    public async execute(customerData: ICreateCustomer): Promise<Customer> {
        const { name, email, password, passwordConfirmation } = customerData;

        if (password !== passwordConfirmation) {
            throw new HttpError(
                'The password and passwordConfirmation must be the same',
                400,
            );
        }

        const foundCustomerByEmail = await this.customerRepository.findByEmail(
            email,
        );

        if (foundCustomerByEmail) {
            throw new HttpError('Email address already exists', 409);
        }

        const passwordHash = await this.hashPassword.generate(password);

        const customerToCreate = {
            email,
            name,
            password: passwordHash,
        };

        return this.customerRepository.createAndSave(customerToCreate);
    }
}
