import { AuthController } from '~/modules/auth/auth.controller'
import { BaseRoute } from './base.route'

export class AuthRoute extends BaseRoute {
  private authController: AuthController

  constructor() {
    super()
    this.authController = new AuthController()
    this.initializeRoutes()
  }

  protected initializeRoutes(): void {
    this.router.post('/login', this.authController.login)
    this.router.post('/signup', this.authController.signup)
  }
}
