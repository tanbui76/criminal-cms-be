import * as winston from 'winston';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston';
import { WinstonModuleOptions } from 'nest-winston';

import config from 'config';
import WinstonCloudWatch from 'winston-cloudwatch';

const isProduction = process.env.NODE_ENV === 'production';
const winstonConfigData = config.get('winston');

export const winstonConfig: WinstonModuleOptions = {
  format: winston.format.colorize(),
  exitOnError: false,
  transports: isProduction
    ? new WinstonCloudWatch({
        name: 'Truthy CMS',
        awsOptions: {
          credentials: {
            accessKeyId:
              process.env.AWS_ACCESS_KEY || winstonConfigData.awsAccessKeyId,
            secretAccessKey:
              process.env.AWS_KEY_SECRET || winstonConfigData.awsSecretAccessKey
          }
        },
        logGroupName:
          process.env.CLOUDWATCH_GROUP_NAME || winstonConfigData.groupName,
        logStreamName:
          process.env.CLOUDWATCH_STREAM_NAME || winstonConfigData.streamName,
        awsRegion:
          process.env.CLOUDWATCH_AWS_REGION || winstonConfigData.awsRegion,
        messageFormatter: function (item) {
          return (
            item.level + ': ' + item.message + ' ' + JSON.stringify(item.meta)
          );
        }
      })
    : new winston.transports.Console({
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.ms(),
          nestWinstonModuleUtilities.format.nestLike('Truthy Logger', {
            prettyPrint: true
          })
        )
      })
};
