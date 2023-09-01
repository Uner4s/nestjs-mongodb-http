import { MinLength, IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateCatArgs {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsString()
  ownerEmail: string

  @MinLength(1)
  @IsNumber()
  age: number
}
