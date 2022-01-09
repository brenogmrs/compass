import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../../common/entities/BaseEntity';

@Entity('customers')
export class CustomerEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    gender: string;

    @Column()
    full_name: string;

    @Column()
    birth_date: string;

    @Column()
    current_city_id: string;

    @OneToMany(() => WishList, wishList => wishList.customer, {
        eager: true,
        cascade: true,
    })
    wishList?: Array<WishList>;
}
