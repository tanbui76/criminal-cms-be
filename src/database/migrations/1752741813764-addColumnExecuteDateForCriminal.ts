import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class addColumnExecuteDateForCriminal1752741813764
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('criminals', [
      new TableColumn({
        name: 'startExecuteDate',
        type: 'date',
        isNullable: true
      }),
      new TableColumn({
        name: 'endExecuteDate',
        type: 'date',
        isNullable: true
      }),
      new TableColumn({
        name: 'doneExecuteDate',
        type: 'date',
        isNullable: true
      })
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('criminals', [
      'startExecuteDate',
      'endExecuteDate',
      'doneExecuteDate'
    ]);
  }
}
