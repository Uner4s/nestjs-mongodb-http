import { TypegooseModule } from '@m8a/nestjs-typegoose'
import { Module } from '@nestjs/common'

import { CatsGetController } from './controllers/cats.get.controller'
import { CatsPostController } from './controllers/cats.post.controller'
import { CatsModel } from './entities/cats.model'
import { CatsService } from './services/cats.service'

@Module({
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: CatsModel,
        schemaOptions: {
          timestamps: true,
          versionKey: false,
          collection: 'cats',
        },
      },
    ]),
  ],
  controllers: [CatsGetController, CatsPostController],
  providers: [CatsService],
})
export class CatsModule {}
