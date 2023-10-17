import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  // CreateDateColumn
  
} from "typeorm";

@Entity()
export class Material extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  materialId: number;

  @Column()
  branchId: string;

  @Column()
  materialName: string;

  @Column()
  unitId: string;

  // @Column()
  // userId: string;

  // @CreateDateColumn()
  // DateTime: Date;


}
