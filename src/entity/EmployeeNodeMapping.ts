import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn
} from "typeorm";
import { NodeMaster } from "./NodeMaster";
import { Employee } from "./Employee";
// import { Shift } from "./Shift";

@Entity()
export class EmployeeNodeMapping extends BaseEntity {
  @PrimaryGeneratedColumn()
  empnodemapId: number;

  @Column()
  branchId: string;

  @Column()
  date: Date;

  // @ManyToOne(() => Shift, (shift) => shift.empNodeMapping)
  // @JoinColumn({ name: "shift_id" })
  // shift: Shift

  @ManyToOne(() => Employee, (emp) => emp.empNodeMapping)
  @JoinColumn({ name: "emp_id" })
  emp: Employee

  @ManyToOne(() => NodeMaster, (node) => node.empNodeMapping)
  @JoinColumn({ name: "node_id" })
  node: NodeMaster

  @Column()
  nodeType: string;

  // @Column()
  // empName: string;

  @Column({default : true })
  isActive: boolean;

  @Column()
  userId: string;

  @Column()
  default: string;

  @Column()
  primary: string;

  @CreateDateColumn()
  DateTime: Date;
  // shift: any;

}
