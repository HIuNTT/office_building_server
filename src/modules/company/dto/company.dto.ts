import { PagerDto } from '~/interfaces/pager.interface'

export class CreateCompanyDto {
  name: string
  taxCode: string
  capital: number
  industry: string
  employeeQuantity?: number
  address: string
  phone: string
  area: number
}

export class UpdateCompanyDto extends CreateCompanyDto {
  _id: string
}

export class GetCompanyInfo extends CreateCompanyDto {
  _id: string
  createdAt: Date
  updatedAt: Date
}

export class CompanyQueryDto extends PagerDto {}
