import { TypegooseModule } from '@m8a/nestjs-typegoose'
import { DynamicModule } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'

export const AppImports = (env: NodeJS.ProcessEnv): DynamicModule[] => {
  return [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `${env.NODE_ENV ? `.${env.NODE_ENV}` : ''}.env`,
    }),
    TypegooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async () => ({
        uri: env.MONGO_URL,
        useNewUrlParser: true,
      }),
      inject: [ConfigService],
    }),
  ]
}
