import { inject, injectable } from 'tsyringe';
import { HttpError } from '../../../../common/errors/http.error';
import { CityEntity } from '../../entities/city.entity';
import { ICreateCity } from '../../interfaces/city.interface';
import { ICityRepository } from '../../repositories/interfaces/city.repository.interface';

@injectable()
export class CreateCityUseCase {
    constructor(
        @inject('CityRepository')
        private cityRepository: ICityRepository,
    ) {}

    public async execute(cityData: ICreateCity): Promise<CityEntity> {
        const { name, uf } = cityData;

        const foundCity = await this.cityRepository.findByNameAndUf(
            name.toUpperCase(),
            uf.toUpperCase(),
        );

        if (foundCity) {
            throw new HttpError(
                'There is already a city with this name in this uf',
                409,
            );
        }

        const newCityData = { ...cityData } as any;

        const dataWithUpperCaseValues = Object.keys(newCityData).reduce(
            (acc: any, key) => {
                acc[key] = newCityData[key].toUpperCase();
                return acc;
            },
            {},
        );

        return this.cityRepository.createAndSave({ ...dataWithUpperCaseValues });
    }
}
