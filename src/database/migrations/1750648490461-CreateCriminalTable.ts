import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateCriminalTable1750648490461 implements MigrationInterface {
    name = 'CreateCriminalTable1750648490461'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user" DROP CONSTRAINT "FK_c28e52f758e7bbc53828db92194"
        `);
        await queryRunner.query(`
            ALTER TABLE "refresh_token" DROP CONSTRAINT "FK_8e913e288156c133999341156ad"
        `);
        await queryRunner.query(`
            ALTER TABLE "role_permission" DROP CONSTRAINT "FK_e3130a39c1e4a740d044e685730"
        `);
        await queryRunner.query(`
            ALTER TABLE "role_permission" DROP CONSTRAINT "FK_72e80be86cab0e93e67ed1a7a9a"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_PERMISSION_RESOURCE"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_PERMISSION_DESCRIPTION"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_ROLE_NAME"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_USER_NAME"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_USER_EMAIL"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_USER_USERNAME"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_EMAIL_TEMPLATES_TITLE"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_REFRESH_TOKEN_BROWSER"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_REFRESH_TOKEN_OS"
        `);
        await queryRunner.query(`
            CREATE TABLE "criminals" (
                "id" SERIAL NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "name" character varying(100) NOT NULL,
                "description" text NOT NULL,
                "birthplace" character varying NOT NULL,
                CONSTRAINT "UQ_cc81e0ef08ab2b3b7a1137c48ee" UNIQUE ("name"),
                CONSTRAINT "PK_e47aac5600ee08df625b5d01496" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE UNIQUE INDEX "IDX_cc81e0ef08ab2b3b7a1137c48e" ON "criminals" ("name")
        `);
        await queryRunner.query(`
            ALTER TABLE "role_permission"
            ADD CONSTRAINT "PK_b42bbacb8402c353df822432544" PRIMARY KEY ("roleId", "permissionId")
        `);
        await queryRunner.query(`
            ALTER TABLE "permission" DROP CONSTRAINT "UQ_b690135d86d59cc689d465ac952"
        `);
        await queryRunner.query(`
            ALTER TABLE "permission" DROP COLUMN "description"
        `);
        await queryRunner.query(`
            ALTER TABLE "permission"
            ADD "description" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "permission"
            ADD CONSTRAINT "UQ_b690135d86d59cc689d465ac952" UNIQUE ("description")
        `);
        await queryRunner.query(`
            ALTER TABLE "permission"
            ALTER COLUMN "isDefault" DROP DEFAULT
        `);
        await queryRunner.query(`
            ALTER TABLE "role"
            ALTER COLUMN "description"
            SET NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "user" DROP CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb"
        `);
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "username"
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "username" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "user" DROP CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22"
        `);
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "email"
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "email" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ALTER COLUMN "password"
            SET NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ALTER COLUMN "name"
            SET NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ALTER COLUMN "address"
            SET NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ALTER COLUMN "contact"
            SET NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "avatar"
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "avatar" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ALTER COLUMN "status" DROP DEFAULT
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ALTER COLUMN "token"
            SET NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ALTER COLUMN "salt"
            SET NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD CONSTRAINT "UQ_c28e52f758e7bbc53828db92194" UNIQUE ("roleId")
        `);
        await queryRunner.query(`
            ALTER TABLE "email_templates" DROP CONSTRAINT "UQ_4d77a74e85c275da60f4badf831"
        `);
        await queryRunner.query(`
            ALTER TABLE "email_templates" DROP COLUMN "title"
        `);
        await queryRunner.query(`
            ALTER TABLE "email_templates"
            ADD "title" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "email_templates" DROP CONSTRAINT "UQ_47fbf61afd456e17d308bb20443"
        `);
        await queryRunner.query(`
            ALTER TABLE "email_templates" DROP COLUMN "slug"
        `);
        await queryRunner.query(`
            ALTER TABLE "email_templates"
            ADD "slug" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "email_templates" DROP COLUMN "sender"
        `);
        await queryRunner.query(`
            ALTER TABLE "email_templates"
            ADD "sender" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "email_templates" DROP COLUMN "subject"
        `);
        await queryRunner.query(`
            ALTER TABLE "email_templates"
            ADD "subject" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "email_templates" DROP COLUMN "body"
        `);
        await queryRunner.query(`
            ALTER TABLE "email_templates"
            ADD "body" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "email_templates"
            ALTER COLUMN "isDefault" DROP DEFAULT
        `);
        await queryRunner.query(`
            ALTER TABLE "refresh_token" DROP COLUMN "ip"
        `);
        await queryRunner.query(`
            ALTER TABLE "refresh_token"
            ADD "ip" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "refresh_token" DROP COLUMN "userAgent"
        `);
        await queryRunner.query(`
            ALTER TABLE "refresh_token"
            ADD "userAgent" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "refresh_token" DROP COLUMN "browser"
        `);
        await queryRunner.query(`
            ALTER TABLE "refresh_token"
            ADD "browser" character varying
        `);
        await queryRunner.query(`
            ALTER TABLE "refresh_token" DROP COLUMN "os"
        `);
        await queryRunner.query(`
            ALTER TABLE "refresh_token"
            ADD "os" character varying
        `);
        await queryRunner.query(`
            ALTER TABLE "refresh_token"
            ALTER COLUMN "isRevoked" DROP DEFAULT
        `);
        await queryRunner.query(`
            ALTER TABLE "refresh_token"
            ALTER COLUMN "expires" DROP DEFAULT
        `);
        await queryRunner.query(`
            CREATE UNIQUE INDEX "IDX_b690135d86d59cc689d465ac95" ON "permission" ("description")
        `);
        await queryRunner.query(`
            CREATE UNIQUE INDEX "IDX_ae4578dcaed5adff96595e6166" ON "role" ("name")
        `);
        await queryRunner.query(`
            CREATE UNIQUE INDEX "IDX_78a916df40e02a9deb1c4b75ed" ON "user" ("username")
        `);
        await queryRunner.query(`
            CREATE UNIQUE INDEX "IDX_e12875dfb3b1d92d7d7c5377e2" ON "user" ("email")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_065d4d8f3b5adb4a08841eae3c" ON "user" ("name")
        `);
        await queryRunner.query(`
            CREATE UNIQUE INDEX "IDX_4d77a74e85c275da60f4badf83" ON "email_templates" ("title")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_192c36a5937bf5eeb9de99290b" ON "refresh_token" ("browser")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_cbf62122e9f9d90ecad419d49f" ON "refresh_token" ("os")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_e3130a39c1e4a740d044e68573" ON "role_permission" ("roleId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_72e80be86cab0e93e67ed1a7a9" ON "role_permission" ("permissionId")
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD CONSTRAINT "FK_c28e52f758e7bbc53828db92194" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "role_permission"
            ADD CONSTRAINT "FK_e3130a39c1e4a740d044e685730" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "role_permission"
            ADD CONSTRAINT "FK_72e80be86cab0e93e67ed1a7a9a" FOREIGN KEY ("permissionId") REFERENCES "permission"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "role_permission" DROP CONSTRAINT "FK_72e80be86cab0e93e67ed1a7a9a"
        `);
        await queryRunner.query(`
            ALTER TABLE "role_permission" DROP CONSTRAINT "FK_e3130a39c1e4a740d044e685730"
        `);
        await queryRunner.query(`
            ALTER TABLE "user" DROP CONSTRAINT "FK_c28e52f758e7bbc53828db92194"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_72e80be86cab0e93e67ed1a7a9"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_e3130a39c1e4a740d044e68573"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_cbf62122e9f9d90ecad419d49f"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_192c36a5937bf5eeb9de99290b"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_4d77a74e85c275da60f4badf83"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_065d4d8f3b5adb4a08841eae3c"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_e12875dfb3b1d92d7d7c5377e2"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_78a916df40e02a9deb1c4b75ed"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_ae4578dcaed5adff96595e6166"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_b690135d86d59cc689d465ac95"
        `);
        await queryRunner.query(`
            ALTER TABLE "refresh_token"
            ALTER COLUMN "expires"
            SET DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "refresh_token"
            ALTER COLUMN "isRevoked"
            SET DEFAULT false
        `);
        await queryRunner.query(`
            ALTER TABLE "refresh_token" DROP COLUMN "os"
        `);
        await queryRunner.query(`
            ALTER TABLE "refresh_token"
            ADD "os" character varying(200)
        `);
        await queryRunner.query(`
            ALTER TABLE "refresh_token" DROP COLUMN "browser"
        `);
        await queryRunner.query(`
            ALTER TABLE "refresh_token"
            ADD "browser" character varying(200)
        `);
        await queryRunner.query(`
            ALTER TABLE "refresh_token" DROP COLUMN "userAgent"
        `);
        await queryRunner.query(`
            ALTER TABLE "refresh_token"
            ADD "userAgent" text
        `);
        await queryRunner.query(`
            ALTER TABLE "refresh_token" DROP COLUMN "ip"
        `);
        await queryRunner.query(`
            ALTER TABLE "refresh_token"
            ADD "ip" character varying(50)
        `);
        await queryRunner.query(`
            ALTER TABLE "email_templates"
            ALTER COLUMN "isDefault"
            SET DEFAULT false
        `);
        await queryRunner.query(`
            ALTER TABLE "email_templates" DROP COLUMN "body"
        `);
        await queryRunner.query(`
            ALTER TABLE "email_templates"
            ADD "body" text
        `);
        await queryRunner.query(`
            ALTER TABLE "email_templates" DROP COLUMN "subject"
        `);
        await queryRunner.query(`
            ALTER TABLE "email_templates"
            ADD "subject" text
        `);
        await queryRunner.query(`
            ALTER TABLE "email_templates" DROP COLUMN "sender"
        `);
        await queryRunner.query(`
            ALTER TABLE "email_templates"
            ADD "sender" character varying(200) NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "email_templates" DROP COLUMN "slug"
        `);
        await queryRunner.query(`
            ALTER TABLE "email_templates"
            ADD "slug" character varying(200) NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "email_templates"
            ADD CONSTRAINT "UQ_47fbf61afd456e17d308bb20443" UNIQUE ("slug")
        `);
        await queryRunner.query(`
            ALTER TABLE "email_templates" DROP COLUMN "title"
        `);
        await queryRunner.query(`
            ALTER TABLE "email_templates"
            ADD "title" character varying(200) NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "email_templates"
            ADD CONSTRAINT "UQ_4d77a74e85c275da60f4badf831" UNIQUE ("title")
        `);
        await queryRunner.query(`
            ALTER TABLE "user" DROP CONSTRAINT "UQ_c28e52f758e7bbc53828db92194"
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ALTER COLUMN "salt" DROP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ALTER COLUMN "token" DROP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ALTER COLUMN "status"
            SET DEFAULT 'active'
        `);
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "avatar"
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "avatar" character varying(200)
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ALTER COLUMN "contact" DROP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ALTER COLUMN "address" DROP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ALTER COLUMN "name" DROP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ALTER COLUMN "password" DROP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "email"
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "email" character varying(100) NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email")
        `);
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "username"
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "username" character varying(100) NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username")
        `);
        await queryRunner.query(`
            ALTER TABLE "role"
            ALTER COLUMN "description" DROP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "permission"
            ALTER COLUMN "isDefault"
            SET DEFAULT false
        `);
        await queryRunner.query(`
            ALTER TABLE "permission" DROP CONSTRAINT "UQ_b690135d86d59cc689d465ac952"
        `);
        await queryRunner.query(`
            ALTER TABLE "permission" DROP COLUMN "description"
        `);
        await queryRunner.query(`
            ALTER TABLE "permission"
            ADD "description" text
        `);
        await queryRunner.query(`
            ALTER TABLE "permission"
            ADD CONSTRAINT "UQ_b690135d86d59cc689d465ac952" UNIQUE ("description")
        `);
        await queryRunner.query(`
            ALTER TABLE "role_permission" DROP CONSTRAINT "PK_b42bbacb8402c353df822432544"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_cc81e0ef08ab2b3b7a1137c48e"
        `);
        await queryRunner.query(`
            DROP TABLE "criminals"
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_REFRESH_TOKEN_OS" ON "refresh_token" ("os")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_REFRESH_TOKEN_BROWSER" ON "refresh_token" ("browser")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_EMAIL_TEMPLATES_TITLE" ON "email_templates" ("title")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_USER_USERNAME" ON "user" ("username")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_USER_EMAIL" ON "user" ("email")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_USER_NAME" ON "user" ("name")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_ROLE_NAME" ON "role" ("name")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_PERMISSION_DESCRIPTION" ON "permission" ("description")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_PERMISSION_RESOURCE" ON "permission" ("resource")
        `);
        await queryRunner.query(`
            ALTER TABLE "role_permission"
            ADD CONSTRAINT "FK_72e80be86cab0e93e67ed1a7a9a" FOREIGN KEY ("permissionId") REFERENCES "permission"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "role_permission"
            ADD CONSTRAINT "FK_e3130a39c1e4a740d044e685730" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "refresh_token"
            ADD CONSTRAINT "FK_8e913e288156c133999341156ad" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD CONSTRAINT "FK_c28e52f758e7bbc53828db92194" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

}
