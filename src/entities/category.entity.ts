import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Resource } from './resource.entity';
import { Feature } from './feature.entity';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @OneToMany(() => Resource, (resource) => resource.category)
  resources: Resource[];

  @OneToMany(() => Feature, (feature) => feature.category)
  features: Feature[];
}