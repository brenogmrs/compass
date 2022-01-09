import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class BaseEntity {
    @CreateDateColumn()
    created_at: string;

    @UpdateDateColumn()
    updated_at: string;
}
