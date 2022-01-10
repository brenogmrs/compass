import 'reflect-metadata';
import sinon from 'sinon';
import { v4 as uuid } from 'uuid';
import { CityRepository } from '../../../../city/repositories/city.repository';
import { GetCityByIdUseCase } from '../../../../city/useCases/getById/getById.city.useCase';
import { CustomerRepository } from '../../../repositories/customer.repository';
import { CreateCustomerUseCase } from '../create.customer.useCase';

describe('Create customer use case context', () => {
    let customerRepository: sinon.SinonStubbedInstance<CustomerRepository>;
    let cityRepository: sinon.SinonStubbedInstance<CityRepository>;

    let createCustomerUseCase: CreateCustomerUseCase;
    let getCityByIdUseCase: GetCityByIdUseCase;

    beforeEach(() => {
        customerRepository = sinon.createStubInstance(CustomerRepository);
        cityRepository = sinon.createStubInstance(CityRepository);

        getCityByIdUseCase = new GetCityByIdUseCase(cityRepository);

        createCustomerUseCase = new CreateCustomerUseCase(
            customerRepository,
            getCityByIdUseCase,
        );
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('instances should be defined', async () => {
        expect(customerRepository).toBeDefined();
        expect(cityRepository).toBeDefined();
        expect(createCustomerUseCase).toBeDefined();
        expect(getCityByIdUseCase).toBeDefined();
    });

    it('should create a customer', async () => {
        const data = {
            full_name: 'bilbo baggins',
            gender: 'M',
            city_id: uuid(),
            birth_date: '1997-06-06',
        };

        const expectedRes = {
            ...data,
            full_name: data.full_name.toUpperCase(),
        };

        const getCityByIdUseCaseSpy = jest
            .spyOn(getCityByIdUseCase, 'execute')
            .mockResolvedValue(<any>'found city');

        const customerRepositorySpy = jest
            .spyOn(customerRepository, 'createAndSave')
            .mockResolvedValue(<any>expectedRes);

        const res = await createCustomerUseCase.execute(data);

        expect(res).toEqual(expectedRes);
        expect(getCityByIdUseCaseSpy).toHaveBeenNthCalledWith(1, data.city_id);
        expect(customerRepositorySpy).toHaveBeenNthCalledWith(1, expectedRes);
    });
});
