import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  CreateDateColumn
} from "typeorm";
import { ActivityLog } from "./activitylog";
import { EmployeeNodeMapping } from "./EmployeeNodeMapping";
import { Batch } from "./Batch";

@Entity()
export class Employee extends BaseEntity {
  // @PrimaryGeneratedColumn()
  // id: number;

  @PrimaryGeneratedColumn()
  empId: number;

  @Column()
  branchId: string;

  @Column()
  empTypeId: string;

  @Column()
  employeeName: string;

  @Column()
  designation: string;

  @Column()
  grade: string;

  @Column({nullable: true })
  dateOfJoining: Date;

  @Column({ nullable: true })
  lastDate: Date;

  @Column({default : true })
  isActive: boolean;

  @Column()
  user: string;

  @Column()
  userName: string;

  @Column()
  password: string;

  @OneToMany(() => ActivityLog, (activityLog) => activityLog.emp)
  activitylog: ActivityLog[]

  @OneToMany(() => Batch, (batch) => batch.emp)
  batch: Batch[]

  @OneToMany(() => EmployeeNodeMapping, (empnodemap) => empnodemap.emp)
  empNodeMapping: EmployeeNodeMapping[]

  @Column()
  userId: string;

  @CreateDateColumn()
  DateTime: Date;

}
