import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
  TableIndex
} from 'typeorm';

export class addProfileType1752636417546 implements MigrationInterface {
  tableName = 'profileTypes';
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

    await queryRunner.addColumn(
      'criminals',
      new TableColumn({
        name: 'profileTypeId',
        type: 'int',
        isNullable: true
      })
    );

    await queryRunner.createForeignKey(
      'criminals',
      new TableForeignKey({
        name: 'FK_CRIMINALS_PROFILETYPE',
        columnNames: ['profileTypeId'],
        referencedTableName: this.tableName,
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      })
    );

    await queryRunner.createIndex(
      this.tableName,
      new TableIndex({
        name: `IDX_PROFILETYPE_NAME`,
        columnNames: ['name']
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const criminalsTable = await queryRunner.getTable('criminals');
    const foreignKey = criminalsTable.foreignKeys.find(
      (fk) => fk.name === 'FK_CRIMINALS_PROFILETYPE'
    );
    if (foreignKey) {
      await queryRunner.dropForeignKey('criminals', foreignKey);
    }

    await queryRunner.dropColumn('criminals', 'profileTypeId');
    const table = await queryRunner.getTable(this.tableName);
    const index = `IDX_PROFILETYPE_NAME`;
    const nameIndex = table.indices.find((fk) => fk.name.indexOf(index) !== -1);
    if (nameIndex) {
      await queryRunner.dropIndex(this.tableName, nameIndex);
    }
    await queryRunner.dropTable(this.tableName);
  }
}
