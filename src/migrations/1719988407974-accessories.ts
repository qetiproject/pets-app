import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Accessories1719988407974 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'accessory',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isNullable: false,
            isPrimary: true,
          },
          {
            name: 'categories',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'brand',
            type: 'varchar',
            isNullable: false,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('accessories');
  }
}
