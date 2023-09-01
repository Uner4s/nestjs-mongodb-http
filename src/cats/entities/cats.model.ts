import { Index, prop } from '@typegoose/typegoose'

import { MongoProps } from '../../helpers/entities/mongo.model'

@Index({ email: 1 })
export class CatsModel extends MongoProps {
  _id!: string

  @prop({ unique: true })
  ownerEmail: string

  @prop({ default: 'Unknown' })
  name: string

  @prop()
  age: number
}
