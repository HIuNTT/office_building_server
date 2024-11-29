import { Account } from './account.enity'
import jwt from 'jsonwebtoken'
import { IPayloadToken, SignupDto, Tokens } from './dto/signup.dto'
import { LoginDto } from './dto/login.dto'
import { BadRequestException } from '~/exceptions/bad-request.exception'
import { compare, hash } from '~/helpers/encryption.helper'

export class AuthService {
  constructor() {}
  async signup(body: SignupDto): Promise<Tokens> {
    const usedUsername = await Account.findOne({ username: body.username })

    if (usedUsername) {
      throw new BadRequestException('Username is already taken')
    }

    const newAccount = new Account({ ...body, password: await hash(body.password) })
    const account = await newAccount.save()
    const tokens = this.generateToken({ accountId: account.id })
    await this.updateRefreshToken(account.id, tokens.refreshToken)
    return tokens
  }

  async login(body: LoginDto): Promise<Tokens> {
    const account = await Account.findOne({ username: body.username })
    if (!account) {
      throw new BadRequestException('Wrong login infomation')
    }

    const { password } = account
    if (!(await compare(body.password, password))) {
      throw new BadRequestException('Wrong login infomation')
    }

    const tokens = this.generateToken({ accountId: account.id })
    await this.updateRefreshToken(account.id, tokens.refreshToken)

    return tokens
  }

  private generateToken(payload: IPayloadToken): Tokens {
    const accessToken = jwt.sign({ accountId: payload.accountId }, process.env.JWT_SECRET!, {
      expiresIn: process.env.JWT_EXPIRE,
    })
    const refreshToken = jwt.sign({ accountId: payload.accountId }, process.env.REFRESH_SECRET!, {
      expiresIn: process.env.REFRESH_EXPIRE,
    })

    return { accessToken, refreshToken }
  }

  private async updateRefreshToken(accountId: string, refreshToken: string): Promise<void> {
    await Account.updateOne({ _id: accountId }, { refreshToken: await hash(refreshToken) })
  }
}
