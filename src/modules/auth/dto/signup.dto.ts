export interface SignupDto {
  username: string
  password: string
}

export interface Tokens {
  accessToken: string
  refreshToken: string
}

export interface IPayloadToken {
  accountId: string
}
