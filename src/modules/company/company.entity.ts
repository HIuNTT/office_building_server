import { model, Schema } from 'mongoose'
import { BaseModel } from '~/interfaces/base-model.interface'

export interface CompanyModel extends BaseModel {
  name: string
  taxCode: string
  capital: number
  industry: string
  employeeQuantity: number
  address: string
  phone: string
  area: number
}

const companySchema = new Schema<CompanyModel>(
  {
    name: { type: String, required: true },
    taxCode: { type: String, required: true, unique: true },
    capital: { type: Number, required: true },
    industry: { type: String, required: true },
    employeeQuantity: { type: Number, default: 0 },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    area: { type: Number, required: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
)

export const Company = model<CompanyModel>('Company', companySchema)
