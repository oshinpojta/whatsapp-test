import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  // CreateDateColumn
} from "typeorm";

@Entity()
export class MaterialCategory extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  materialCategoryId: number;

  @Column()
  branchId: string;

  @Column()
  productTypeDescription: string;

  // @Column()
  // userId: string;

  // @CreateDateColumn()
  // DateTime: Date;


}
