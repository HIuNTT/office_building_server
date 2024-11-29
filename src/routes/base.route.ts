import { Router } from 'express'

export abstract class BaseRoute {
  readonly router: Router

  constructor() {
    this.router = Router()
  }

  protected abstract initializeRoutes(): void
}
