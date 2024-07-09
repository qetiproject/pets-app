// import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

// export class PetShopAdditionalFields1720536046597
//   implements MigrationInterface
// {
//   public async up(queryRunner: QueryRunner): Promise<void> {
//     await queryRunner.addColumn(
//       'pet_shop',
//       new TableColumn({
//         name: 'city',
//         type: 'varchar',
//         isNullable: true,
//       }),
//     );

//     await queryRunner.addColumn(
//       'pet_shop',
//       new TableColumn({
//         name: 'address',
//         type: 'varchar',
//         isNullable: true,
//       }),
//     );
//   }

//   public async down(queryRunner: QueryRunner): Promise<void> {
//     await queryRunner.dropColumn('pet_shop', 'address');
//     await queryRunner.dropColumn('pet_shop', 'city');
//   }
// }
