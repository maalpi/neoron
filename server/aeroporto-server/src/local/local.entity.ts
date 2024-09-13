import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'locations' })
export class Location {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'postalCode', nullable: false })
  postalCode: string; // CEP

  @Column({ name: 'country', nullable: false })
  country: string; // País

  @Column({ name: 'city', nullable: false })
  city: string; // Cidade

  @Column({ name: 'state', nullable: false })
  state: string; // Estado
}