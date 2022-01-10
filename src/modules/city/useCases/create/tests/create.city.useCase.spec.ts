import exp from 'constants';
import 'reflect-metadata';
import sinon from 'sinon';
import { container } from 'tsyringe';
import { v4 as uuid } from 'uuid';
import { CityRepository } from '../../../repositories/city.repository';
import { CreateCityUseCase } from '../create.city.useCase';

describe('Create city use case context', () => {
    let cityRepository: sinon.SinonStubbedInstance<CityRepository>;

    let createCityUseCase: CreateCityUseCase;

    beforeEach(() => {
        sinon.restore();
        cityRepository = sinon.createStubInstance(CityRepository);

        createCityUseCase = new CreateCityUseCase(cityRepository);
    });

    it('should create a city', async () => {
        const data = {
            name: 'belo horizonte',
            uf: 'mg',
        };

        const expectedRes = {
            name: 'BELO HORIZONTE',
            uf: 'MG',
        };

        const findCityByNameAndUfSpy = jest
            .spyOn(cityRepository, 'findByNameAndUf')
            .mockResolvedValue(<any>undefined);

        const createAndSaveSpy = jest
            .spyOn(cityRepository, 'createAndSave')
            .mockResolvedValue(<any>expectedRes);

        const res = await createCityUseCase.execute(data);

        expect(res).toEqual(expectedRes);
        expect(findCityByNameAndUfSpy).toHaveBeenNthCalledWith(
            1,
            data.name,
            data.uf,
        );

        expect(createAndSaveSpy).toHaveBeenNthCalledWith(1, expectedRes);
    });

    it('should not create a already existing city', async () => {
        const data = {
            name: 'belo horizonte',
            uf: 'mg',
        };

        const expectedRes = {
            name: 'BELO HORIZONTE',
            uf: 'MG',
        };

        const findCityByNameAndUfSpy = jest
            .spyOn(cityRepository, 'findByNameAndUf')
            .mockResolvedValue(<any>data);

        try {
            await createCityUseCase.execute(data);
        } catch (error: any) {
            console.log(error);
            expect(error.message).toEqual(
                'There is already a city with this name in this uf',
            );
            expect(error.code).toEqual(409);
        }
    });
});
