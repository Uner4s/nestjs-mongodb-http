import {
  Controller,
  Req,
  Res,
  HttpException,
  HttpStatus,
  Get,
  HttpCode,
} from '@nestjs/common'
import { Response, Request } from 'express'

import { CatsModel } from '../entities/cats.model'
import { CatsService } from '../services/cats.service'

@Controller('cats-query')
export class CatsGetController {
  constructor(private readonly catsService: CatsService) {}

  @Get('/cats-list')
  @HttpCode(HttpStatus.OK)
  async getCatsInBD(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const response: CatsModel[] = await this.catsService.findAll()

      return res
        .status(HttpStatus.OK)
        .json({
          cats: response,
        })
        .send()
    } catch (error) {
      throw new HttpException(
        error.response,
        error.status || HttpStatus.SERVICE_UNAVAILABLE,
      )
    }
  }
}
