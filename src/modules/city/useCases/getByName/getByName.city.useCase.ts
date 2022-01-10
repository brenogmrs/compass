import { inject, injectable } from 'tsyringe';
import { HttpError } from '../../../../common/errors/http.error';
import { CityEntity } from '../../entities/city.entity';
import { ICityRepository } from '../../repositories/interfaces/city.repository.interface';

@injectable()
export class GetCityByNameUseCase {
    constructor(
        @inject('CityRepository')
        private customerRepository: ICityRepository,
    ) {}

    public async execute(cityName: string): Promise<CityEntity> {
        const upperCaseCityName = cityName.toUpperCase();

        const foundCity = await this.customerRepository.findByName(
            upperCaseCityName,
        );

        if (!foundCity) {
            throw new HttpError('City not found', 404);
        }

        return foundCity;
    }
}
