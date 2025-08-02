import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCriminalProfileTypeTable1753675018271
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Tạo bảng trung gian cho Many-to-Many relationship
    await queryRunner.query(`
            CREATE TABLE "criminal_profile_types" (
                "id" SERIAL PRIMARY KEY,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "criminalId" INTEGER NOT NULL,
                "profileTypeId" INTEGER NOT NULL,
                CONSTRAINT "FK_criminal_profile_types_criminal" 
                    FOREIGN KEY ("criminalId") REFERENCES "criminals"("id") ON DELETE CASCADE,
                CONSTRAINT "FK_criminal_profile_types_profile_type" 
                    FOREIGN KEY ("profileTypeId") REFERENCES "profileTypes"("id") ON DELETE CASCADE,
                CONSTRAINT "UQ_criminal_profile_type" 
                    UNIQUE ("criminalId", "profileTypeId")
            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Xóa bảng trung gian
    await queryRunner.query(`DROP TABLE IF EXISTS "criminal_profile_types"`);
  }
}
