import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { ValueType } from '../enums/value-type.enum';
import { Category } from './category.entity';
import { FeatureValue } from './feature-value.entity';

@Entity('features')
export class Feature {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({
    type: 'varchar',
    enum: ValueType,
    default: ValueType.STRING,
  })
  type: ValueType;

  @Column({ name: 'category_id' })
  categoryId: string;

  @ManyToOne(() => Category, (category) => category.features)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @OneToMany(() => FeatureValue, (featureValue) => featureValue.feature)
  featureValues: FeatureValue[];
}