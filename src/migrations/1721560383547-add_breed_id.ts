import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AddBreedId1721560383547 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'pet',
      new TableColumn({
        name: 'breed_id',
        type: 'uuid',
        isNullable: true, // Assuming breed_id can be nullable
      }),
    );
    await queryRunner.createForeignKey(
      'pet',
      new TableForeignKey({
        name: 'FK_pet_breed',
        columnNames: ['breed_id'],
        referencedTableName: 'pet_breed',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('pet', 'FK_pet_breed');
    await queryRunner.dropColumn('pet', 'breed_id');
  }
}
