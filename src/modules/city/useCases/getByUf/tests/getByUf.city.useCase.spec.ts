import 'reflect-metadata';
import sinon from 'sinon';
import { CityRepository } from '../../../repositories/city.repository';
import { GetCitiesByUfUseCase } from '../getByUf.city.useCase';

describe('Get city by uf use case context', () => {
    let cityRepository: sinon.SinonStubbedInstance<CityRepository>;

    let getCitiesByUfUseCase: GetCitiesByUfUseCase;

    beforeEach(() => {
        sinon.restore();
        cityRepository = sinon.createStubInstance(CityRepository);

        getCitiesByUfUseCase = new GetCitiesByUfUseCase(cityRepository);
    });
    it('should find a cities by uf', async () => {
        const uf = 'mg';
        const data = [
            {
                name: 'belo horizonte',
                uf: 'mg',
            },
            {
                name: 'contagem',
                uf: 'mg',
            },
        ];

        const findByUfSpy = jest
            .spyOn(cityRepository, 'findByUf')
            .mockResolvedValue(<any>data);

        const res = await getCitiesByUfUseCase.execute(uf);

        expect(res).toEqual(data);
        expect(findByUfSpy).toHaveBeenNthCalledWith(1, uf.toUpperCase());
    });

    it('should not find cities by uf', async () => {
        expect.hasAssertions();
        jest.spyOn(cityRepository, 'findByUf').mockResolvedValue(<any>[]);

        try {
            await getCitiesByUfUseCase.execute('data.id');
        } catch (error: any) {
            expect(error.message).toEqual('No city was found for this uf');
            expect(error.code).toEqual(404);
        }
    });
});
