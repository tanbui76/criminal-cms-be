import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';

import { MailService } from 'src/mail/mail.service';
import { MailProcessor } from 'src/mail/mail.processor';
import { EmailTemplateModule } from 'src/email-template/email-template.module';

import config from 'config';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    EmailTemplateModule,
    BullModule.registerQueueAsync({
      name: 'truthy-mail',
      useFactory: () => {
        const queueConfig = config.get('queue');
        return {
          redis: {
            host: process.env.REDIS_HOST || queueConfig.host,
            port: process.env.REDIS_PORT || queueConfig.port,
            password: process.env.REDIS_PASSWORD || queueConfig.password,
            retryStrategy(times) {
              return Math.min(times * 50, 2000);
            }
          }
        };
      }
    }),
    MailerModule.forRootAsync({
      useFactory: () => {
        const mailConfig = config.get('mail');
        return {
          transport: {
            host: process.env.MAIL_HOST || mailConfig.host,
            port: process.env.MAIL_PORT || mailConfig.port,
            secure: mailConfig.secure,
            ignoreTLS: mailConfig.ignoreTLS,
            auth: {
              user: process.env.MAIL_USER || mailConfig.user,
              pass: process.env.MAIL_PASS || mailConfig.pass
            }
          },
          defaults: {
            from: `"${process.env.MAIL_FROM || mailConfig.from}" <${
              process.env.MAIL_FROM || mailConfig.fromMail
            }>`
          },
          preview: mailConfig.preview,
          template: {
            dir: __dirname + '/templates/email/layouts/',
            adapter: new PugAdapter(),
            options: {
              strict: true
            }
          }
        };
      }
    })
  ],
  controllers: [],
  providers: [MailService, MailProcessor],
  exports: [MailService]
})
export class MailModule {}
