import {
  BaseEntity,
  Column,
  Entity,
  // JoinColumn,
  // ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn
} from "typeorm";
// import { NodeMaster } from "./NodeMaster";
// import { Employee } from "./Employee";
// import { Shift } from "./Shift";
// import { ActivityLog } from "./activitylog";
// import { Jobs } from "./Job";

@Entity()
export class Batch extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  branchId: string;

  @Column()
  nodeId: string;

  @Column()
  jobId: string;

  @Column()
  itemId: string;

  @Column()
  activityId: string;

  @Column()
  quantity: number;

  @Column()
  units: number;

  @Column()
  product: string;

  @Column()
  date: Date;

  @Column()
  userId: string;

  @Column()
  outputId: string;

  @CreateDateColumn()
  DateTime: Date;

  // @ManyToOne(() => Employee, (emp) => emp.batch)
  // @JoinColumn({ name: "emp_id" })
  // emp: Employee

  // @ManyToOne(() => NodeMaster, (node) => node.machineNode)
  // @JoinColumn({ name: "machine_node_id" })
  // machineNode: NodeMaster

  // @ManyToOne(() => NodeMaster, (node) => node.materialNode)
  // @JoinColumn({ name: "materail_node_id" })
  // materialNode: NodeMaster

  // @ManyToOne(() => ActivityLog, (activitylog) => activitylog.batch)
  // @JoinColumn({ name: "activity_log_id" })
  // activitylog: ActivityLog

  // @Column()
  // date: Date;

  // @ManyToOne(() => Shift, (shift) => shift.batch)
  // @JoinColumn({ name: "shift_id" })
  // shift: Shift

  // @ManyToOne(() => Jobs, (job) => job.batch)
  // @JoinColumn({ name: "job_id" })
  // job: Jobs

}
