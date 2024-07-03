import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class ShopItems1719952341802 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'shop_items',
        columns: [
          {
            name: 'shop_id',
            type: 'varchar',
            isNullable: false,
            isPrimary: true,
          },
          {
            name: 'accessory_id',
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
            type: 'boolean',
            isNullable: false,
          },
        ],
        foreignKeys: [
          {
            columnNames: ['shop_id'],
            referencedTableName: 'pet_shop',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'pet',
      new TableForeignKey({
        columnNames: ['shopId'],
        referencedTableName: 'pet-shop',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('shop_items');
    await queryRunner.dropTable('accessories_shop_items');
  }
}
