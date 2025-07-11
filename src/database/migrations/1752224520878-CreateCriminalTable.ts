import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class CreateCriminalTable1752224520878 implements MigrationInterface {
  tableName = 'criminals';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: this.tableName,
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment'
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
            isUnique: true,
            length: '100'
          },
          {
            name: 'birthplace',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'birthdate',
            type: 'timestamp',
            isNullable: true
          },
          {
            name: 'address',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'description',
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

    await queryRunner.createIndex(
      this.tableName,
      new TableIndex({
        name: `IDX_CRIMINAL_NAME`,
        columnNames: ['name']
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable(this.tableName);
    const index = `IDX_CRIMINAL_NAME`;
    const nameIndex = table.indices.find((fk) => fk.name.indexOf(index) !== -1);
    if (nameIndex) {
      await queryRunner.dropIndex(this.tableName, nameIndex);
    }
    await queryRunner.dropTable(this.tableName);
  }
}
