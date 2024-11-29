import { model, Schema } from 'mongoose'
import { BaseModel } from '~/interfaces/base-model.interface'

export interface AccountModel extends BaseModel {
  username: string
  password: string
  refreshToken?: string
}

const accountSchema = new Schema<AccountModel>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    refreshToken: { type: String, default: null },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
)

export const Account = model<AccountModel>('Account', accountSchema)
