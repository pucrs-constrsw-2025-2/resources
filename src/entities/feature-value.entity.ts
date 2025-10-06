import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Resource } from './resource.entity';
import { Feature } from './feature.entity';

@Entity('feature_values')
export class FeatureValue {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'value_string', type: 'varchar', length: 500, nullable: true })
  valueString: string;

  @Column({ name: 'value_number', type: 'real', nullable: true })
  valueNumber: number;

  @Column({ name: 'value_boolean', type: 'boolean', nullable: true })
  valueBoolean: boolean;

  @Column({ name: 'resource_id' })
  resourceId: string;

  @Column({ name: 'feature_id' })
  featureId: string;

  @ManyToOne(() => Resource, (resource) => resource.features)
  @JoinColumn({ name: 'resource_id' })
  resource: Resource;

  @ManyToOne(() => Feature, (feature) => feature.featureValues)
  @JoinColumn({ name: 'feature_id' })
  feature: Feature;
}