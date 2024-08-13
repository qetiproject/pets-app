import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Pet1719950771729 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'pet',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isNullable: false,
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
            name: 'owner_id',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'price',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'color',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'type',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'has_genealogical_list',
            type: 'boolean',
            isNullable: false,
          },
          {
            name: 'is_club_member',
            type: 'boolean',
            isNullable: false,
          },
          {
            name: 'shop_id',
            type: 'varchar',
            isNullable: true,
          },
        ],
        foreignKeys: [
          {
            name: 'FK_pet_owner',
            columnNames: ['owner_id'],
            referencedTableName: 'owner',
            referencedColumnNames: ['username'],
            onDelete: 'SET NULL',
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
