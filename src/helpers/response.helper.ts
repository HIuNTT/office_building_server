export class ResOp<T = any> {
  statusCode: number
  message: string
  data?: T

  constructor(data: T, statusCode = 200, message = 'Success') {
    this.statusCode = statusCode
    this.message = message
    this.data = data
  }
}
