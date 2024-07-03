import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class PetShop1719951486833 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'pet_shop',
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
            name: 'active',
            type: 'varchar',
            isNullable: false,
          },
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'pet_shop_items',
        columns: [
          {
            name: 'shopId',
            type: 'varchar',
            isNullable: false,
            isPrimary: true,
          },
          {
            name: 'id',
            type: 'varchar',
            isNullable: false,
            isPrimary: true,
          },
        ],
        foreignKeys: [
          {
            columnNames: ['shopId'],
            referencedTableName: 'shop_items',
            referencedColumnNames: ['shopId'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            columnNames: ['id'],
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
    await queryRunner.dropTable('pet_shop');
  }
}
