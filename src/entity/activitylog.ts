import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn
} from "typeorm";

@Entity()
export class ActivityLog extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  branchId: string;

  @Column()
  activityType: string;

  @Column({ type: 'date' }) // Use CreateDateColumn with type 'date'
  date: Date;

  @Column({ type: 'datetime' })
  shiftStartTime: Date;

  @Column({ type: 'datetime'})
  shiftEndTime: Date;

  @Column()
  nodeId: string;

  @Column()
  employeeName: string;

  @Column()
  Shift: string;

  @Column()
  jobId: string;

  @Column({ nullable: true })
  userId: string;

  @CreateDateColumn()
  DateTime: Date;
}
