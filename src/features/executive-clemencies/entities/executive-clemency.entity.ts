import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { CustomBaseEntity } from 'src/common/entity/custom-base.entity';
import { CriminalEntity } from 'src/features/criminals/entities/criminal.entity';

@Entity({
  name: 'executive_clemencies'
})
export class ExecutiveClemencyEntity extends CustomBaseEntity {
  constructor(data?: Partial<ExecutiveClemencyEntity>) {
    super();
    if (data) {
      Object.assign(this, data);
    }
  }

  @Index()
  @Column({ type: 'int', nullable: false })
  criminalId: number;

  @Column({ type: 'varchar', length: 100, nullable: true, unique: true })
  decisionNumber: string;

  @Column({ type: 'date', nullable: true })
  decisionDate: Date;

  @Column({ type: 'int', nullable: false, default: 0 })
  sentenceReductionDays: number;

  @Column({ type: 'text', nullable: true })
  reason: string;

  @ManyToOne(() => CriminalEntity, (criminal) => criminal.executiveClemencies, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'criminalId' })
  criminal: CriminalEntity;
}
