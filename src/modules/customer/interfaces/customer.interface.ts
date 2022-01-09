import { CustomerEntity } from '../entities/customer.entity';

export interface ICreateCustomer {
    full_name: string;
    gender: string;
    city_id?: string;
    birth_date: string;
}

export interface IFindCustomerResponse extends CustomerEntity {
    age: number;
}

export interface IUpdateCustomer {
    name?: string;
    email?: string;
}
