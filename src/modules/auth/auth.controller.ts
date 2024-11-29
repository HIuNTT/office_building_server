import { NextFunction, Response } from 'express'
import { IRequestBody } from '~/interfaces/request.interface'
import { SignupDto } from './dto/signup.dto'
import { AuthService } from './auth.service'
import { LoginDto } from './dto/login.dto'
import { ResOp } from '~/helpers/response.helper'

export class AuthController {
  private authService: AuthService

  constructor() {
    this.authService = new AuthService()
  }

  login = async (req: IRequestBody<LoginDto, keyof LoginDto>, res: Response, next: NextFunction): Promise<void> => {
    try {
      const tokens = await this.authService.login(req.body)
      res.send(new ResOp(tokens))
    } catch (error) {
      next(error)
    }
  }

  signup = async (req: IRequestBody<SignupDto, keyof SignupDto>, res: Response, next: NextFunction): Promise<void> => {
    try {
      const tokens = await this.authService.signup(req.body)
      res.send(new ResOp(tokens))
    } catch (error) {
      next(error)
    }
  }
}
