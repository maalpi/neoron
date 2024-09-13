import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Location } from 'src/local/local.entity';

@Entity({ name: 'flights' })
export class Flight {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'flightCode', unique: true, nullable: false })
  flightCode: string; // Código do vôo

  @Column({ name: 'date', nullable: false, type: 'timestamp', unique: true })
  date: Date; // Data do vôo

  // Relacionamento ManyToOne com Origem e Destino (ambos são Location)
  @ManyToOne(() => Location, { eager: true })
  origin: Location;

  @ManyToOne(() => Location, { eager: true })
  destination: Location;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
