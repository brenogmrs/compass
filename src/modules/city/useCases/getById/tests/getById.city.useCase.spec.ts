import 'reflect-metadata';
import sinon from 'sinon';
import { v4 as uuid } from 'uuid';
import { CityRepository } from '../../../repositories/city.repository';
import { GetCityByIdUseCase } from '../getById.city.useCase';

describe('Get customer by id use case context', () => {
    let cityRepository: sinon.SinonStubbedInstance<CityRepository>;

    let getCityByIdUseCase: GetCityByIdUseCase;

    beforeEach(() => {
        sinon.restore();
        cityRepository = sinon.createStubInstance(CityRepository);

        getCityByIdUseCase = new GetCityByIdUseCase(cityRepository);
    });

    it('should find a customer by id', async () => {
        const id = uuid();
        const data = {
            name: 'belo horizonte',
            uf: 'mg',
        };

        const findByIdSpy = jest
            .spyOn(cityRepository, 'findById')
            .mockResolvedValue(<any>data);

        const res = await getCityByIdUseCase.execute(id);

        expect(res).toEqual(data);
        expect(findByIdSpy).toHaveBeenNthCalledWith(1, id);
    });

    it('should not find a customer by id', async () => {
        expect.hasAssertions();
        jest.spyOn(cityRepository, 'findById').mockResolvedValue(undefined);

        try {
            await getCityByIdUseCase.execute('id');
        } catch (error: any) {
            expect(error.message).toEqual('City not found');
            expect(error.code).toEqual(404);
        }
    });
});
