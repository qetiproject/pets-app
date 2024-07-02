import { table } from 'console';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class Accessories1719953084253 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new table({
        name: 'accessory',
        column: [
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
