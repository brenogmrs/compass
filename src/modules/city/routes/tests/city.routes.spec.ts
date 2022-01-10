import 'reflect-metadata';
import sinon from 'sinon';
import request from 'supertest';
import { container } from 'tsyringe';
import app from '../../../../app';
import { CreateCityUseCase } from '../../useCases/create/create.city.useCase';
import { GetCityByNameUseCase } from '../../useCases/getByName/getByName.city.useCase';
import { GetCitiesByUfUseCase } from '../../useCases/getByUf/getByUf.city.useCase';

describe('Customer routes tests', () => {
    let createCityUseCase: sinon.SinonStubbedInstance<CreateCityUseCase>;

    let getCityByNameUseCase: sinon.SinonStubbedInstance<GetCityByNameUseCase>;
    let getCitiesByUfUseCase: sinon.SinonStubbedInstance<GetCitiesByUfUseCase>;

    beforeEach(() => {
        sinon.restore();
        createCityUseCase = sinon.createStubInstance(CreateCityUseCase);

        getCityByNameUseCase = sinon.createStubInstance(GetCityByNameUseCase);
        getCitiesByUfUseCase = sinon.createStubInstance(GetCitiesByUfUseCase);
    });

    describe('POST /api/city', () => {
        it('should create a city', async () => {
            jest.spyOn(container, 'resolve').mockReturnValue(createCityUseCase);

            const data = {
                name: 'any name',
                uf: 'MG',
            };

            const createCustomerUseCaseSpy = jest
                .spyOn(createCityUseCase, 'execute')
                .mockResolvedValue(<any>data);

            const response = await request(app).post('/api/city').send(data);

            expect(response.status).toBe(201);
            expect(response.body).toEqual(data);
            expect(createCustomerUseCaseSpy).toBeCalled();
        });

        it('Bad Request - should not create a customer with invalid body', async () => {
            jest.spyOn(container, 'resolve').mockReturnValue(createCityUseCase);

            const data = {
                name: 'any name',
                uf: '',
            };

            const createCustomerUseCaseSpy = jest
                .spyOn(createCityUseCase, 'execute')
                .mockResolvedValue(<any>data);

            const response = await request(app).post('/api/city').send();

            expect(response.status).toBe(400);
            expect(response.body.errors).toEqual([
                'The property name is required',
                'The property uf is required',
            ]);
            expect(createCustomerUseCaseSpy).not.toBeCalled();
        });

        it('should find city by name', async () => {
            jest.spyOn(container, 'resolve').mockReturnValue(getCityByNameUseCase);

            const name = 'gandalf the grey';

            const data = {
                name: 'any name',
                uf: 'mg',
            };

            const getCityByNameUseCaseSpy = jest
                .spyOn(getCityByNameUseCase, 'execute')
                .mockResolvedValue(<any>data);

            const response = await request(app)
                .get(`/api/city/name/?name=${name}`)
                .send();

            expect(response.status).toBe(200);
            expect(response.body).toEqual(data);
            expect(getCityByNameUseCaseSpy).toBeCalled();
        });

        it('Bad Request - should not find city by name', async () => {
            jest.spyOn(container, 'resolve').mockReturnValue(getCityByNameUseCase);

            const data = {
                name: 'any name',
                uf: 'mg',
            };

            const getCityByNameUseCaseSpy = jest
                .spyOn(getCityByNameUseCase, 'execute')
                .mockResolvedValue(<any>data);

            const response = await request(app).get(`/api/city/name?name=`).send();

            expect(response.status).toBe(400);
            expect(response.body.errors).toEqual(['The property name is required']);
            expect(getCityByNameUseCaseSpy).not.toBeCalled();
        });

        it('should find cities by uf', async () => {
            jest.spyOn(container, 'resolve').mockReturnValue(getCitiesByUfUseCase);

            const uf = 'MG';

            const data = {
                name: 'any name',
                uf: 'mg',
            };

            const getCitiesByUfUseCaseSpy = jest
                .spyOn(getCitiesByUfUseCase, 'execute')
                .mockResolvedValue(<any>data);

            const response = await request(app).get(`/api/city/uf/?uf=${uf}`).send();

            expect(response.status).toBe(200);
            expect(response.body).toEqual(data);
            expect(getCitiesByUfUseCaseSpy).toBeCalled();
        });

        it('Bad Request - should find cities by uf', async () => {
            jest.spyOn(container, 'resolve').mockReturnValue(getCitiesByUfUseCase);

            const data = {
                name: 'any name',
                uf: 'mg',
            };

            const getCitiesByUfUseCaseSpy = jest
                .spyOn(getCitiesByUfUseCase, 'execute')
                .mockResolvedValue(<any>data);

            const response = await request(app).get(`/api/city/uf?uf=`).send();

            expect(response.status).toBe(400);
            expect(response.body.errors).toEqual([
                'The property uf is required',
                'uf must be one of the following values: RO, AC, AM, RR, PA, AP, TO, MA, PI, CE, RN, PB, PE, AL, SE, BA, MG, ES, RJ, SP, PR, SC, RS, MS, MT, GO, DF',
            ]);
            expect(getCitiesByUfUseCaseSpy).not.toBeCalled();
        });
    });
});
