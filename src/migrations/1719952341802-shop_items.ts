import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class ShopItems1719952341802 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'shop_items',
        columns: [
          {
            name: 'shopId',
            type: 'varchar',
            isNullable: false,
            isPrimary: true,
          },
          {
            name: 'accessoryId',
            type: 'varchar',
            isNullable: false,
            isPrimary: true,
          },
          {
            name: 'price',
            type: 'int',
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
        name: 'accessories_shop_items',
        columns: [
          {
            name: 'shopId',
            type: 'varchar',
            isNullable: false,
            isPrimary: true,
          },
          {
            name: 'accessoryId',
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
            columnNames: ['accessoryId'],
            referencedTableName: 'accessories',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('shop_items');
  }
}
