import { ConfigModule, ConfigService } from '@nestjs/config';
import databaseConfig from './config/database.config';

ConfigModule.forRoot({
  isGlobal: true,
  load: [databaseConfig],
}),

MongooseModule.forRootAsync({
  inject: [ConfigService],
  useFactory: (config: ConfigService) => ({
    uri: config.get('mongoUri'),
  }),
}),