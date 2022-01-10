import { inject, injectable } from 'tsyringe';
import { HttpError } from '../../../../common/errors/http.error';
import { CityEntity } from '../../entities/city.entity';
import { ICityRepository } from '../../repositories/interfaces/city.repository.interface';

@injectable()
export class GetCitiesByUfUseCase {
    constructor(
        @inject('CityRepository')
        private cityRepository: ICityRepository,
    ) {}

    public async execute(cityUf: string): Promise<CityEntity[]> {
        const upperCaseCityUf = cityUf.toUpperCase();

        const foundByCitiesUf = await this.cityRepository.findByUf(upperCaseCityUf);

        if (foundByCitiesUf.length <= 0) {
            throw new HttpError('No city was found for this uf', 404);
        }

        return foundByCitiesUf;
    }
}
