import {
          BaseEntity,
          Column,
          Entity,
          CreateDateColumn,
          PrimaryGeneratedColumn,
        } from "typeorm";
@Entity()
export class FGMapping extends BaseEntity {
          @PrimaryGeneratedColumn()
          id: number;

          @Column()
          branchId: string;

          @Column()
          nodeIdFG: string;

          @Column()
          nodeIdRM: string;

          @Column()
          nodeCategory: string ;

          @Column()
          userId: string;

          @Column()
          nodeId: string;

          @CreateDateColumn()
          DateTime: Date;

}