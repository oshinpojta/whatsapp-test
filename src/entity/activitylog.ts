import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class ActivityLog extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  branchId: string;

  @Column()
  activityType: string;

  @Column()
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
}
