import { container, delay } from 'tsyringe';
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
