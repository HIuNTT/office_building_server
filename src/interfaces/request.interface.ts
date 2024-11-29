import { Request } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
export interface IRequestBody<T, K extends keyof T> extends Omit<Request, 'body'> {
  body: Pick<T, K>
}

export interface IRequestParams<T> extends Request {
  params: T & ParamsDictionary
}

export interface IRequestQuery<T> extends Request {
  query: T & ParamsDictionary
}
