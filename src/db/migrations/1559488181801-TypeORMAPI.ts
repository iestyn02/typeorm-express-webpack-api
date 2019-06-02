import {MigrationInterface, QueryRunner} from "typeorm";

export class typeORMAPI1559488181801 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "demo"."products" DROP COLUMN "regular_price"`);
        await queryRunner.query(`ALTER TABLE "demo"."products" ADD "regular_price" float NOT NULL`);
        await queryRunner.query(`ALTER TABLE "demo"."products" DROP COLUMN "sale_price"`);
        await queryRunner.query(`ALTER TABLE "demo"."products" ADD "sale_price" float`);
        await queryRunner.query(`ALTER TABLE "demo"."companies" DROP COLUMN "latitude"`);
        await queryRunner.query(`ALTER TABLE "demo"."companies" ADD "latitude" float`);
        await queryRunner.query(`ALTER TABLE "demo"."companies" DROP COLUMN "longitude"`);
        await queryRunner.query(`ALTER TABLE "demo"."companies" ADD "longitude" float`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "demo"."companies" DROP COLUMN "longitude"`);
        await queryRunner.query(`ALTER TABLE "demo"."companies" ADD "longitude" double precision`);
        await queryRunner.query(`ALTER TABLE "demo"."companies" DROP COLUMN "latitude"`);
        await queryRunner.query(`ALTER TABLE "demo"."companies" ADD "latitude" double precision`);
        await queryRunner.query(`ALTER TABLE "demo"."products" DROP COLUMN "sale_price"`);
        await queryRunner.query(`ALTER TABLE "demo"."products" ADD "sale_price" double precision`);
        await queryRunner.query(`ALTER TABLE "demo"."products" DROP COLUMN "regular_price"`);
        await queryRunner.query(`ALTER TABLE "demo"."products" ADD "regular_price" double precision NOT NULL`);
    }

}
