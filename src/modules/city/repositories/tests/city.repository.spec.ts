import { getConnection } from 'typeorm';
import { getDatabaseConfigConnectionQA } from '../../../../config/database/connection';
import { CityEntity } from '../../entities/city.entity';
import { CityRepository } from '../city.repository';

describe('city repository context', () => {
    let cityRepository: CityRepository;

    beforeAll(async () => {
        await getDatabaseConfigConnectionQA();

        cityRepository = new CityRepository();
    });

    afterEach(async () => {
        await getConnection().manager.clear(CityEntity);
        jest.resetAllMocks();
    });

    afterAll(async () => {
        await getConnection().close();
    });

    it('should create a customer', async () => {
        const data = {
            name: 'bh',
            uf: 'MG',
        };

        const res = await cityRepository.createAndSave(data);

        expect(res).toEqual(expect.objectContaining(data));
    });

    it('should find a city by id', async () => {
        const data = {
            name: 'bh',
            uf: 'MG',
        };

        const createdCity = await cityRepository.createAndSave(data);

        const foundCity = await cityRepository.findById(createdCity.id);

        expect(foundCity!.id).toEqual(createdCity.id);
    });

    it('should find a city by name', async () => {
        const data = {
            name: 'bh',
            uf: 'MG',
        };

        const createdCity = await cityRepository.createAndSave(data);

        const foundCity = await cityRepository.findByName(createdCity.name);

        expect(foundCity).toEqual({ ...createdCity });
    });

    it('should find a cities by uf', async () => {
        const data = {
            name: 'bh',
            uf: 'MG',
        };

        const createdCity = await cityRepository.createAndSave(data);

        const [foundCity] = await cityRepository.findByUf(createdCity.uf);

        expect(foundCity).toEqual(expect.objectContaining(data));
    });

    it('should find a city by uf and name', async () => {
        const data = {
            name: 'bh',
            uf: 'MG',
        };

        const createdCity = await cityRepository.createAndSave(data);

        const foundCity = await cityRepository.findByNameAndUf(
            createdCity.name,
            createdCity.uf,
        );

        expect(foundCity).toEqual(expect.objectContaining(data));
    });
});
