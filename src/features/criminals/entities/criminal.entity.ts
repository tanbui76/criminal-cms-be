import { Column, Entity, Index, ManyToOne, Unique } from 'typeorm';

import { CustomBaseEntity } from 'src/common/entity/custom-base.entity';
import { ProfileTypeEntity } from 'src/features/profileTypes/entities/profile-type.entity';

@Entity({
  name: 'criminals'
})
@Unique(['name'])
export class CriminalEntity extends CustomBaseEntity {
  @Column('varchar', { length: 100 })
  @Index({
    unique: true
  })
  name: string;

  @Column('text')
  description: string;

  @Column('varchar')
  birthplace: string;

  @ManyToOne(() => ProfileTypeEntity, (profileType) => profileType.criminals)
  profileType: ProfileTypeEntity;

  @Column('date')
  startExecuteDate: Date; //Ngày bắt đầu chấp hành án

  @Column('date')
  endExecuteDate: Date; //Ngày kết thúc thi hành án

  @Column('date')
  doneExecuteDate: Date; //Ngày chấp hành án xong

  constructor(data?: Partial<CriminalEntity>) {
    super();
    if (data) {
      Object.assign(this, data);
    }
  }
}
