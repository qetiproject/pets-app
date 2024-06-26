import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Pet1719418280233 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'pet',
        columns: [
          {
            name: 'username',
            type: 'varchar',
            isNullable: false,
            isPrimary: true,
          },
          {
            name: 'firstName',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'lastName',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'age',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'ownerId',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'date',
            type: 'timestamp',
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
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('pet');
  }
}
