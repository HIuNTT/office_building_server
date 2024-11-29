/* eslint-disable @typescript-eslint/no-explicit-any */
import { isObject, isString } from 'lodash'

export class HttpException extends Error {
  constructor(
    private readonly response: string | Record<string, any>,
    private readonly status: number,
  ) {
    super()
    this.initMessage()
    this.initName()
  }

  public initMessage() {
    if (isString(this.response)) {
      this.message = this.response
    } else if (isObject(this.response) && isString((this.response as Record<string, any>).message)) {
      this.message = (this.response as Record<string, any>).message
    } else if (this.constructor) {
      this.message = this.constructor.name.match(/[A-Z][a-z]+|[0-9]+/g)?.join(' ') ?? 'Error'
    }
  }

  public initName(): void {
    this.name = this.constructor.name
  }

  public getStatus(): number {
    return this.status
  }
}
