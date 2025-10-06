import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Category } from './category.entity';
import { FeatureValue } from './feature-value.entity';

@Entity('resources')
export class Resource {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'integer' })
  quantity: number;

  @Column({ type: 'boolean', default: true })
  status: boolean;

  @Column({ name: 'category_id' })
  categoryId: string;

  @ManyToOne(() => Category, (category) => category.resources)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @OneToMany(() => FeatureValue, (featureValue) => featureValue.resource)
  features: FeatureValue[];
}