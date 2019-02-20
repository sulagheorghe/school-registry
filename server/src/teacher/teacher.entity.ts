import {Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Teacher {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", {"length": 255})
    firstName: string;
    
    @Column("varchar", {"length": 255})
    lastName: string;

    @Column()
    phoneNumber: number;

    @Column("varchar", {"length": 255})
    email: string;

    @Column()
    password: string;
}