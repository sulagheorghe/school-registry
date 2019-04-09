import {Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Teacher {
    @PrimaryGeneratedColumn()
    protected readonly id: number;

    @Column("varchar", {"length": 255})
    protected firstName: string;
    
    @Column("varchar", {"length": 255})
    protected lastName: string;

    @Column()
    protected phoneNumber: number;

    @Column("varchar", {"length": 255})
    protected email: string;

    @Column()
    protected password: string;

    @Column()
    protected role: string;
}