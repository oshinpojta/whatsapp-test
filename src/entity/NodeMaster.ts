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

  @Column({nullable: true})
  nodeType: string;

  @Column({nullable: true})
  nodeCategory: string;

  @Column()
  nodeName: string;

  @Column({nullable:true})
  itemDescription: string;

  @Column()
  width: string;

  @Column()
  height: string;

  // New Column 28-10-23 
  @Column({nullable:true})
  borderRadius: string;

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
