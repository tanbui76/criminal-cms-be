import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey
} from 'typeorm';

export class createJudgementExecution1752741003266
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'judgmentExecution',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment'
          },
          {
            name: 'serial',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'punishment',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'court',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'offense',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'now()'
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'now()'
          }
        ]
      }),
      true
    );

    await queryRunner.addColumn(
      'criminals',
      new TableColumn({
        name: 'judgmentExecutionId',
        type: 'int',
        isNullable: true,
        isUnique: true
      })
    );

    await queryRunner.createForeignKey(
      'criminals',
      new TableForeignKey({
        name: 'FK_CRIMINALS_JUDGMENT_EXECUTION',
        columnNames: ['judgmentExecutionId'],
        referencedTableName: 'judgmentExecution',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('criminals');
    const fk = table.foreignKeys.find(
      (fk) => fk.name === 'FK_CRIMINALS_JUDGMENT_EXECUTION'
    );
    if (fk) {
      await queryRunner.dropForeignKey('criminals', fk);
    }

    await queryRunner.dropColumn('criminals', 'judgmentExecutionId');

    await queryRunner.dropTable('judgmentExecution');
  }
}
