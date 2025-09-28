import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey
} from 'typeorm';

export class CreateExecutiveClemencyTable1758874130045
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'executive_clemencies',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment'
          },
          {
            name: 'criminalId',
            type: 'int',
            isNullable: false
          },
          {
            name: 'decisionNumber',
            type: 'varchar',
            isNullable: true,
            isUnique: true,
            length: '100'
          },
          {
            name: 'decisionDate',
            type: 'date',
            isNullable: true
          },
          {
            name: 'sentenceReductionDays',
            type: 'int',
            isNullable: false,
            default: 0
          },
          {
            name: 'reason',
            type: 'text',
            isNullable: true
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
      false
    );

    const foreignKey = new TableForeignKey({
      columnNames: ['criminalId'],
      referencedTableName: 'criminals',
      referencedColumnNames: ['id'],
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      name: 'FK_criminal_executive_clemency'
    });

    await queryRunner.createForeignKey('executive_clemencies', foreignKey);
    // await queryRunner.query(
    //   `ALTER TABLE executive_clemencies ADD CONSTRAINT FK_criminal_executive_clemency FOREIGN KEY ("criminalId") REFERENCES criminals(id) ON DELETE CASCADE`
    // );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('executive_clemencies', true);
  }
}
