import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn
} from "typeorm";
// import { ActivityLog } from "./activitylog";
//import { EmployeeNodeMapping } from "./EmployeeNodeMapping";
// import { Batch } from "./Batch";

@Entity()
export class Manager extends BaseEntity {

    @PrimaryGeneratedColumn()
    empId: number;

    @Column()
    branchId: string;

    @Column({ nullable: true })
    employeeName: string;

    @Column({ nullable: true })
    designation: string;

    @Column({ nullable: true })
    phoneno: string;

    @Column()
    userId: string;

    @CreateDateColumn()
    DateTime: Date;

}
