import express, { Response } from 'express'
import cors from 'cors'
import routes from './routes'
import connectDb from './configs/database.config'
import { errorMiddleware } from './middlewares/error.middleware'
import { HttpStatus } from './enums/http-status.enum'
import { ResOp } from './helpers/response.helper'
import compression from 'compression'

export default class App {
  private app: express.Application
  readonly port: number | string

  constructor(port: number | string) {
    this.app = express()
    this.port = port

    connectDb()
    this.initializeMiddlewares()
    this.initializeRoutes()
    this.initializeErrorHandling()
  }

  private initializeMiddlewares() {
    // parse json request body
    this.app.use(express.json())

    // parse urlencoded request body
    this.app.use(express.urlencoded({ extended: true }))

    // gzip compression response
    this.app.use(compression())

    // Enable CORS for all requests
    this.app.use(cors({ origin: '*', credentials: true }))
  }

  private initializeRoutes() {
    this.app.use('/api/v1', routes)
  }

  private initializeErrorHandling() {
    this.app.use((_, res: Response) => {
      res.status(HttpStatus.NOT_FOUND).send(new ResOp(null, HttpStatus.NOT_FOUND, 'Not found endpoints'))
    })

    // Exception Filter
    this.app.use(errorMiddleware)
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App is running at http://localhost:${this.port}`)
    })
  }
}
