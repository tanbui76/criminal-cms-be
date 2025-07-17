import { Column, Entity } from 'typeorm';

import { CustomBaseEntity } from 'src/common/entity/custom-base.entity';

@Entity({
  name: 'judgementExecutions'
})
export class JudgmentExecutionEntity extends CustomBaseEntity {
  @Column('varchar')
  serial: string; //Số quyết định

  @Column('varchar')
  punishment: string; //Hình phạt

  @Column('varchar')
  court: string; //tòa án

  @Column('varchar')
  offense: string; //tội danh

  constructor(data?: Partial<JudgmentExecutionEntity>) {
    super();
    if (data) {
      Object.assign(this, data);
    }
  }
}
