import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from '../../../common/entities/BaseEntity';
import { CityEntity } from '../../city/entities/city.entity';

@Entity('customers')
export class CustomerEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('uuid')
    city_id: string;

    @Column()
    gender: string;

    @Column()
    full_name: string;

    @Column()
    birth_date: string;

    @ManyToOne(() => CityEntity, city => city.customer, { eager: true })
    @JoinColumn({ name: 'city_id' })
    city?: CityEntity;
}
