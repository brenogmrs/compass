import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../../common/entities/BaseEntity';
import { CustomerEntity } from '../../customer/entities/customer.entity';

@Entity('cities')
export class CityEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    uf: string;

    @OneToMany(() => CustomerEntity, customer => customer.city)
    customer?: Array<CustomerEntity>;
}
