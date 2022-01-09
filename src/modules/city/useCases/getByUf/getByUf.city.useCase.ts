import { inject, injectable } from 'tsyringe';
import { CityEntity } from '../../entities/city.entity';
import { ICityRepository } from '../../repositories/interfaces/city.repository.interface';

@injectable()
export class GetCitiesByUfUseCase {
    constructor(
        @inject('CityRepository')
        private cityRepository: ICityRepository,
    ) {}

    public async execute(cityUf: string): Promise<CityEntity[]> {
        const foundByCitiesUf = await this.cityRepository.findByUf(cityUf);

        return foundByCitiesUf;
    }
}
