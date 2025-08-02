import { ThrottlerModuleOptions } from '@nestjs/throttler';
import { ThrottlerStorageRedisService } from 'nestjs-throttler-storage-redis';

const config = require('config');
const throttleConfigVariables = config.get('throttle.global');
const redisConfig = config.get('queue');

export const throttleConfig: ThrottlerModuleOptions = {
  ttl: process.env.THROTTLE_TTL || throttleConfigVariables.get('ttl'),
  limit: process.env.THROTTLE_LIMIT || throttleConfigVariables.get('limit'),
  storage: new ThrottlerStorageRedisService({
    host: process.env.REDIS_HOST || redisConfig.host,
    port: process.env.REDIS_PORT || redisConfig.port,
    password: process.env.REDIS_PASSWORD || redisConfig.password
  })
};

