import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Pet1719950771729 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'pet',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isNullable: false,
            isPrimary: true,
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
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'price',
            type: 'int',
            isNullable: false,
          },
        ],
        foreignKeys: [
          {
            columnNames: ['ownerId'],
            referencedTableName: 'owner',
            referencedColumnNames: ['username'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            columnNames: ['shopId'],
            referencedTableName: 'pet_shop',
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
