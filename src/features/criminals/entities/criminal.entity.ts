import {
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  Unique
} from 'typeorm';

import { CustomBaseEntity } from 'src/common/entity/custom-base.entity';
import { ProfileTypeEntity } from 'src/features/profileTypes/entities/profile-type.entity';
import { JudgmentExecutionEntity } from 'src/features/judgementExecution/entities/judgement-execution.entity';

@Entity({
  name: 'criminals'
})
@Unique(['name'])
export class CriminalEntity extends CustomBaseEntity {
  @Column('varchar', { length: 100 })
  @Index({
    unique: true
  })
  name: string; //tên

  @Column('text')
  description: string; //mô tả (ghi chú)

  @Column('varchar')
  birthplace: string; //nơi sinh

  @Column('date')
  birthdate: Date; //ngày tháng năm sinh

  @Column('varchar')
  address: string; // hộ khẩu thường trú

  @ManyToMany(() => ProfileTypeEntity, (profileType) => profileType.criminals)
  @JoinTable({
    name: 'criminal_profile_types',
    joinColumn: {
      name: 'criminalId',
      referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: 'profileTypeId',
      referencedColumnName: 'id'
    }
  })
  profileTypes: ProfileTypeEntity[];

  @OneToOne(() => JudgmentExecutionEntity)
  @JoinColumn()
  judgmentExecution: JudgmentExecutionEntity;

  @Column('date')
  startExecuteDate: Date; //Ngày bắt đầu chấp hành án

  @Column('date')
  endExecuteDate: Date; //Ngày kết thúc thi hành án

  // @Column('date')
  // doneExecuteDate: Date; //Ngày chấp hành án xong

  @Column('varchar')
  refNo: string;

  constructor(data?: Partial<CriminalEntity>) {
    super();
    if (data) {
      Object.assign(this, data);
    }
  }
}
