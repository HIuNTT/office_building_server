import { NextFunction, Request, Response } from 'express'
import { HttpStatus } from '~/enums/http-status.enum'
import { HttpException } from '~/exceptions/http.exception'
import { IBaseResponse } from '~/interfaces/response.interface'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
  const url = req.url
  const status = getStatusCode(err)
  const message = getErrorMessage(err)

  console.warn(`Error: (${status}) ${message} Path: ${decodeURI(url)}`)
  console.error(err)

  const resBody: IBaseResponse = {
    statusCode: status,
    message,
    data: null,
  }

  res.status(status).send(resBody)

  function getStatusCode(err: any): number {
    if (err instanceof HttpException) {
      return err.getStatus()
    } else {
      return HttpStatus.INTERNAL_SERVER_ERROR
    }
  }

  function getErrorMessage(err: any): string {
    if (err instanceof HttpException) {
      return err.message
    } else {
      return 'Internal server error'
    }
  }
}
