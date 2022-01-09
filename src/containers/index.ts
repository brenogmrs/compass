import { container, delay } from 'tsyringe';
import { CustomerRepository } from '../modules/customer/repositories/customer.repository';
import { ICustomerRepository } from '../modules/customer/repositories/interfaces/customer.repository.interface';
import { AuthCustomerUseCase } from '../modules/customer/useCases/auth/auth.customer.useCase';
import { CreateCustomerUseCase } from '../modules/customer/useCases/create/create.customer.useCase';
import { DeleteCustomerUseCase } from '../modules/customer/useCases/delete/delete.customer.useCase';
import { GetCustomerByIdUseCase } from '../modules/customer/useCases/getById/getById.customer.useCase';
import { UpdateCustomerUseCase } from '../modules/customer/useCases/update/update.customer.useCase';
import { HashPassword } from '../modules/customer/utils/hashPassword/index';
import { FetchProductService } from '../modules/product/externalServices/fetchProduct.service';
import { IWishListRepository } from '../modules/wishlist/repositories/interfaces/wishList.repository.interface';
import { WishListRepository } from '../modules/wishlist/repositories/wishList.repository';
import { CreateWishListUseCase } from '../modules/wishlist/useCases/create/create.wishList.useCase';
import { DeleteWishListUseCase } from '../modules/wishlist/useCases/delete/delete.wishList.useCase';
import { GetAllWishListProductsUseCase } from '../modules/wishlist/useCases/getAll/getAll.wishListProducts.useCase';

container.registerSingleton<ICustomerRepository>(
    'CustomerRepository',
    delay(() => CustomerRepository),
);

container.registerSingleton<IWishListRepository>(
    'WishListRepository',
    delay(() => WishListRepository),
);

container.registerSingleton<FetchProductService>(
    'FetchProductService',
    FetchProductService,
);

container.registerSingleton<CreateCustomerUseCase>(
    'CreateCustomerUseCase',
    CreateCustomerUseCase,
);

container.registerSingleton<GetCustomerByIdUseCase>(
    'GetCustomerByIdUseCase',
    GetCustomerByIdUseCase,
);

container.registerSingleton<UpdateCustomerUseCase>(
    'UpdateCustomerUseCase',
    UpdateCustomerUseCase,
);

container.registerSingleton<AuthCustomerUseCase>(
    'AuthCustomerUseCase',
    AuthCustomerUseCase,
);

container.registerSingleton<DeleteCustomerUseCase>(
    'DeleteCustomerUseCase',
    DeleteCustomerUseCase,
);

container.registerSingleton<CreateWishListUseCase>(
    'CreateWishListUseCase',
    CreateWishListUseCase,
);

container.registerSingleton<DeleteWishListUseCase>(
    'DeleteWishListUseCase',
    DeleteWishListUseCase,
);

container.registerSingleton<GetAllWishListProductsUseCase>(
    'GetAllWishListProductsUseCase',
    GetAllWishListProductsUseCase,
);

container.registerSingleton<HashPassword>('HashPassword', HashPassword);
