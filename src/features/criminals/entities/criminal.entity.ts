import { Column, Entity, Index, Unique } from 'typeorm';

import { CustomBaseEntity } from 'src/common/entity/custom-base.entity';

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

  constructor(data?: Partial<CriminalEntity>) {
    super();
    if (data) {
      Object.assign(this, data);
    }
  }
}
