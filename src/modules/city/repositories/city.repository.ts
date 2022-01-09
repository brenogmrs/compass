import { getRepository, Repository } from 'typeorm';
import { CityEntity } from '../entities/city.entity';
import { ICreateCity } from '../interfaces/city.interface';
import { ICityRepository } from './interfaces/city.repository.interface';

export class CityRepository implements ICityRepository {
    private ormRepository: Repository<CityEntity>;

    constructor() {
        this.ormRepository = getRepository(CityEntity);
    }

    public async createAndSave(customerData: ICreateCity): Promise<CityEntity> {
        const customer = this.ormRepository.create(customerData);

        return this.ormRepository.save(customer);
    }

    public async findByName(cityName: string): Promise<CityEntity | undefined> {
        return this.ormRepository.findOne({ name: cityName });
    }

    public async findByUf(cityUf: string): Promise<CityEntity[]> {
        return this.ormRepository.find({ uf: cityUf });
    }

    public async findById(id: string): Promise<CityEntity | undefined> {
        return this.ormRepository.findOne({ id });
    }

    public async findByNameAndUf(
        cityName: string,
        cityUf: string,
    ): Promise<CityEntity | undefined> {
        return this.ormRepository.findOne({ name: cityName, uf: cityUf });
    }
}
