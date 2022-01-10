import 'reflect-metadata';
import sinon from 'sinon';
import { CityRepository } from '../../../repositories/city.repository';
import { GetCityByNameUseCase } from '../getByName.city.useCase';

describe('Get customer by id use case context', () => {
    let cityRepository: sinon.SinonStubbedInstance<CityRepository>;

    let getCityByNameUseCase: GetCityByNameUseCase;

    beforeEach(() => {
        sinon.restore();
        cityRepository = sinon.createStubInstance(CityRepository);

        getCityByNameUseCase = new GetCityByNameUseCase(cityRepository);
    });
    it('should find a city by name', async () => {
        const data = {
            name: 'belo horizonte',
            uf: 'mg',
        };

        const findByIdSpy = jest
            .spyOn(cityRepository, 'findByName')
            .mockResolvedValue(<any>data);

        const res = await getCityByNameUseCase.execute(data.name);

        expect(res).toEqual(data);
        expect(findByIdSpy).toHaveBeenNthCalledWith(1, data.name.toUpperCase());
    });

    it('should not find a city by name', async () => {
        expect.hasAssertions();
        jest.spyOn(cityRepository, 'findByName').mockResolvedValue(undefined);

        try {
            await getCityByNameUseCase.execute('data.name');
        } catch (error: any) {
            expect(error.message).toEqual('City not found');
            expect(error.code).toEqual(404);
        }
    });
});
