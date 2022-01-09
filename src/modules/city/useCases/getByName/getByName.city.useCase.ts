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
        const foundCity = await this.customerRepository.findById(cityName);

        if (!foundCity) {
            throw new HttpError('City not found', 404);
        }

        return foundCity;
    }
}
