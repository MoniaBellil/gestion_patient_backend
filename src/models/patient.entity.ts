
import {Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn } from 'typeorm';


@Entity('patients')
export class Patient {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'string', length: 100 })
  name: string;

  @Column({ type: 'string', length: 100 })
  surname: string;

  @Column({ type: 'date' })
  birthDate: Date;

  @Column({ type: 'string', length: 10 })
  gender: string;

  @Column({ type: 'string', length: 255 })
  address: string;

  @Column({ type: 'string', length: 100 })
  phoneNumber: string;

  @Column({ type: 'string', length: 255 })
  email: string;

  @Column({ type: 'string', length: 255 })
  medicalInformation: string;

}