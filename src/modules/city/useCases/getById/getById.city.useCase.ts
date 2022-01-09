import { inject, injectable } from 'tsyringe';
import { HttpError } from '../../../../common/errors/http.error';
import { CityEntity } from '../../entities/city.entity';
import { ICityRepository } from '../../repositories/interfaces/city.repository.interface';

@injectable()
export class GetCityByIdUseCase {
    constructor(
        @inject('CityRepository')
        private cityRepository: ICityRepository,
    ) {}

    public async execute(cityId: string): Promise<CityEntity> {
        const foundCity = await this.cityRepository.findById(cityId);

        if (!foundCity) {
            throw new HttpError('City not found', 404);
        }

        return foundCity;
    }
}
