import { Test, TestingModule } from '@nestjs/testing'
import { MongoMemoryServer } from 'mongodb-memory-server'
import * as mongoose from 'mongoose'

import { AppImports } from '../../src/app.imports'
import { CatsModule } from '../../src/cats/cats.module'
import { CatsGetController } from '../../src/cats/controllers/cats.get.controller'
import { CatsPostController } from '../../src/cats/controllers/cats.post.controller'

describe('CatsResolver', () => {
  let catsGetController: CatsGetController
  let catsPostController: CatsPostController
  let mongoServer: MongoMemoryServer

  beforeEach(async () => {
    mongoServer = await MongoMemoryServer.create()
    const mongoUri = mongoServer.getUri()

    const env = {
      MONGO_URL: mongoUri,
    }

    const module: TestingModule = await Test.createTestingModule({
      imports: [...AppImports(env), CatsModule],
    }).compile()

    catsGetController = module.get<CatsGetController>(CatsGetController)
    catsPostController = module.get<CatsPostController>(CatsPostController)
  })

  // Close all BD Connections
  afterAll(async () => {
    await mongoose.disconnect()
    mongoServer.removeAllListeners()
    await mongoServer.stop()
  })

  it('Should resolvers be defined', async () => {
    expect(catsGetController).toBeDefined()
    expect(catsPostController).toBeDefined()
  })
})
