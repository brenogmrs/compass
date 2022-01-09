import { CityEntity } from '../../entities/city.entity';
import { ICreateCity } from '../../interfaces/city.interface';

export interface ICityRepository {
    createAndSave(customerData: ICreateCity): Promise<CityEntity>;
    findByNameAndUf(
        cityName: string,
        cityUf: string,
    ): Promise<CityEntity | undefined>;
    findByName(cityName: string): Promise<CityEntity | undefined>;
    findByUf(cityUf: string): Promise<CityEntity[]>;
    findById(id: string): Promise<CityEntity | undefined>;
}
