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
  name: string; //tên

  @Column('text')
  description: string; //mô tả (ghi chú)

  @Column('varchar')
  birthplace: string; //nơi sinh

  @Column('varchar')
  birthdate: Date; //ngày tháng năm sinh

  @Column('varchar')
  address: string; // hộ khẩu thường trú

  constructor(data?: Partial<CriminalEntity>) {
    super();
    if (data) {
      Object.assign(this, data);
    }
  }
}
