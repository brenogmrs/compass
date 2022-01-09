export interface ICreateCustomer {
    name: string;
    email: string;
    password: string;
    passwordConfirmation?: string;
}

export interface IUpdateCustomer {
    name?: string;
    email?: string;
}
