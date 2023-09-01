import {
  Controller,
  Post,
  Body,
  Req,
  Res,
  HttpException,
  HttpStatus,
  HttpCode,
} from '@nestjs/common'
import { Response, Request } from 'express'

import { CreateCatArgs } from '../dto/createCat.dto'
import { CatsModel } from '../entities/cats.model'
import { CatsService } from '../services/cats.service'

@Controller('cats-mutate')
export class CatsPostController {
  constructor(private readonly catsService: CatsService) {}

  @Post('/create-cat')
  @HttpCode(HttpStatus.OK)
  async payWithTransbank(
    @Body() params: CreateCatArgs,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const response: CatsModel = await this.catsService.create(params)

      return res
        .status(HttpStatus.OK)
        .json({
          cat: response,
        })
        .send()
    } catch (error) {
      throw new HttpException(
        error,
        error.status || HttpStatus.SERVICE_UNAVAILABLE,
      )
    }
  }
}
