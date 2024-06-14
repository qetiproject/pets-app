import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Pet1718400043664 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'pet',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'age',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'animal',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'ownerId',
            type: 'uuid',
            isNullable: true,
          },
        ],
        foreignKeys: [
          {
            columnNames: ['ownerId'],
            referencedTableName: 'owner',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('pet');
  }
}
