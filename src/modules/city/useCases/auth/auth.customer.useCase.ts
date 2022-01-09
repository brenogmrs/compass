import * as jwt from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
import { HttpError } from '../../../../common/errors/http.error';
import { jwtConfig } from '../../../../config/auth/jwt';
import { IAuthCustomer } from '../../interfaces/auth.interface';
import { ICustomerRepository } from '../../repositories/interfaces/customer.repository.interface';
import { IHashPassword } from '../../utils/hashPassword/interfaces/hashPassword.interface';
import { setRedis } from '../../utils/redis/redisConfig';

@injectable()
export class AuthCustomerUseCase {
    constructor(
        @inject('CustomerRepository')
        private customerRepository: ICustomerRepository,

        @inject('HashPassword')
        private hashPassword: IHashPassword,
    ) {}

    public async execute(customerData: IAuthCustomer): Promise<any> {
        const { email, password } = customerData;

        const foundCustomer = await this.customerRepository.findByEmail(email);

        if (!foundCustomer) {
            throw new HttpError('Customer not found', 404);
        }

        const isPasswordValid = await this.hashPassword.compare(
            password,
            foundCustomer.password,
        );

        if (!isPasswordValid) {
            throw new HttpError('Invalid password', 400);
        }

        const token = jwt.sign(
            {
                customer: foundCustomer,
            },
            jwtConfig.jwt.secret,
            {
                expiresIn: jwtConfig.jwt.expiresIn,
            },
        );

        return { customer: foundCustomer, token };
    }
}
