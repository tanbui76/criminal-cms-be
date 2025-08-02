import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule } from '@nestjs/throttler';
import { WinstonModule } from 'nest-winston';

import config from 'config';

import { AppController } from 'src/app.controller';
import { AuthModule } from 'src/auth/auth.module';
import { RolesModule } from 'src/role/roles.module';
import { PermissionsModule } from 'src/permission/permissions.module';
import { EmailTemplateModule } from 'src/email-template/email-template.module';
import { RefreshTokenModule } from 'src/refresh-token/refresh-token.module';
import { TwofaModule } from 'src/twofa/twofa.module';
import { CriminalsModule } from 'src/features/criminals/criminals.module';
import { ProfileTypesModule } from 'src/features/profileTypes/profile-types.module';
import { DashboardModule } from 'src/dashboard/dashboard.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MailModule } from 'src/mail/mail.module';
import { BullModule } from '@nestjs/bull';
import { ormConfig } from 'src/config/ormconfig';
import { throttleConfig } from 'src/config/throttle-config';
import { winstonConfig } from 'src/config/winston';

const appConfig = config.get('app');

@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfig),
    ThrottlerModule.forRoot(throttleConfig),
    WinstonModule.forRoot(winstonConfig),
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '..', 'public'),
    //   serveRoot: '/',
    //   exclude: ['/api*', '/dashboard*', '/criminals*', '/auth*', '/users*', '/roles*', '/permissions*', '/email-template*', '/twofa*', '/profile-types*', '/judgement-executions*']
    // }),
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT) || 6379,
        password: process.env.REDIS_PASSWORD || ''
      }
    }),
    AuthModule,
    RolesModule,
    PermissionsModule,
    EmailTemplateModule,
    RefreshTokenModule,
    TwofaModule,
    CriminalsModule,
    ProfileTypesModule,
    DashboardModule,
    MailModule
  ],
  controllers: [AppController],
  providers: []
})
export class AppModule {}
