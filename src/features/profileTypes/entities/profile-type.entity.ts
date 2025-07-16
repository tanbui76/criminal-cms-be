import { Column, Entity, Index, OneToMany, Unique } from 'typeorm';

import { CustomBaseEntity } from 'src/common/entity/custom-base.entity';
import { CriminalEntity } from 'src/features/criminals/entities/criminal.entity';

@Entity({
  name: 'profileTypes'
})
@Unique(['name'])
export class ProfileTypeEntity extends CustomBaseEntity {
  @Column('varchar', { length: 100 })
  @Index({
    unique: true
  })
  name: string; //tên

  @Column('text')
  description: string; //mô tả (ghi chú)

  @OneToMany(() => CriminalEntity, (criminal) => criminal.profileType)
  criminals: CriminalEntity[];

  constructor(data?: Partial<ProfileTypeEntity>) {
    super();
    if (data) {
      Object.assign(this, data);
    }
  }
}
