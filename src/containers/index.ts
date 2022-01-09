import { container, delay } from 'tsyringe';
import { CityRepository } from '../modules/city/repositories/city.repository';
import { ICityRepository } from '../modules/city/repositories/interfaces/city.repository.interface';
import { CreateCityUseCase } from '../modules/city/useCases/create/create.city.useCase';
import { GetCityByIdUseCase } from '../modules/city/useCases/getById/getById.city.useCase';
import { GetCityByNameUseCase } from '../modules/city/useCases/getByName/getByName.city.useCase';
import { GetCitiesByUfUseCase } from '../modules/city/useCases/getByUf/getByUf.city.useCase';
import { CustomerRepository } from '../modules/customer/repositories/customer.repository';
import { ICustomerRepository } from '../modules/customer/repositories/interfaces/customer.repository.interface';
import { CreateCustomerUseCase } from '../modules/customer/useCases/create/create.customer.useCase';
import { DeleteCustomerUseCase } from '../modules/customer/useCases/delete/delete.customer.useCase';
import { GetCustomerByIdUseCase } from '../modules/customer/useCases/getById/getById.customer.useCase';
import { GetCustomerByNameUseCase } from '../modules/customer/useCases/getByName/getByName.customer.useCase';
import { UpdateCustomerUseCase } from '../modules/customer/useCases/update/update.customer.useCase';

container.registerSingleton<ICustomerRepository>(
    'CustomerRepository',
    delay(() => CustomerRepository),
);

container.registerSingleton<ICityRepository>(
    'CityRepository',
    delay(() => CityRepository),
);

container.registerSingleton<CreateCityUseCase>(
    'CreateCityUseCase',
    CreateCityUseCase,
);

container.registerSingleton<GetCityByIdUseCase>(
    'GetCityByIdUseCase',
    GetCityByIdUseCase,
);

container.registerSingleton<GetCityByNameUseCase>(
    'GetCityByNameUseCase',
    GetCityByNameUseCase,
);

container.registerSingleton<GetCitiesByUfUseCase>(
    'GetCitiesByUfUseCase',
    GetCitiesByUfUseCase,
);

container.registerSingleton<CreateCustomerUseCase>(
    'CreateCustomerUseCase',
    CreateCustomerUseCase,
);

container.registerSingleton<GetCustomerByNameUseCase>(
    'GetCustomerByNameUseCase',
    GetCustomerByNameUseCase,
);

container.registerSingleton<GetCustomerByIdUseCase>(
    'GetCustomerByIdUseCase',
    GetCustomerByIdUseCase,
);

container.registerSingleton<UpdateCustomerUseCase>(
    'UpdateCustomerUseCase',
    UpdateCustomerUseCase,
);

container.registerSingleton<DeleteCustomerUseCase>(
    'DeleteCustomerUseCase',
    DeleteCustomerUseCase,
);
