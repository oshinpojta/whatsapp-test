import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  CreateDateColumn
} from "typeorm";
// import { ActivityLog } from "./activitylog";
import { EmployeeNodeMapping } from "./EmployeeNodeMapping";
import { JobAssign } from "./JobAssign";
// import { Batch } from "./Batch";
import { EdgeMaster } from "./EdgeMaster";

@Entity()
export class NodeMaster extends BaseEntity {
  @PrimaryGeneratedColumn()
  nodeId: number;

  @Column()
  id: string;

  @Column()
  branchId: string;

  @Column()
  nodeCategoryId: string;

  @Column()
  nodeType: string;

  @Column({nullable: true})
  nodeCategory: string;

  @Column()
  nodeName: string;

  @Column()
  width: string;

  @Column()
  height: string;

  @Column()
  xPosition: number;

  @Column()
  yPosition: number;

  @Column()
  borderColor: string;

  @Column()
  borderWidth: string;

  @Column()
  borderStyle: string;

  @Column()
  fillColor: string;

  @Column()
  fillTransparency: string;

  @Column({default:false})
  isRootNode: boolean;

  @Column({default:false})
  isParent: boolean;

  @Column()
  formula: string;

  @Column()
  fuelUsed: string;

  @Column({default:false})
  fuelUnitsId: string;

  @Column()
  capacity: string;

  @Column({default:false})
  capacityUnitsId: string;

  @Column()
  sourcePosition: string;

  @Column()
  targetPosition: string;

  @Column()
  FontColor: string;

  @Column()
  FontStyle: string;

  @Column()
  FontSize: string;

  // @OneToMany(() => ActivityLog, (activityLog) => activityLog.materialNode)
  // activitylog: ActivityLog[]

  // @OneToMany(() => Batch, (batch) => batch.machineNode)
  // machineNode: Batch[]

  // @OneToMany(() => Batch, (batch) => batch.materialNode)
  // materialNode: Batch[]

  @OneToMany(() => EmployeeNodeMapping, (empnodemap) => empnodemap.node)
  empNodeMapping: EmployeeNodeMapping[]

  @OneToMany(() => JobAssign, (jobassign) => jobassign.node)
  jobassign: NodeMaster[]

  @OneToMany(() => EdgeMaster, (edgemaster) => edgemaster.sourceNodeId)
  sourceNodeId: EdgeMaster[]

  @OneToMany(() => EdgeMaster, (edgemaster) => edgemaster.targetNodeId)
  targetNodeId: EdgeMaster[]
  @Column()
  userId: string;

  @CreateDateColumn()
  DateTime: Date

}
