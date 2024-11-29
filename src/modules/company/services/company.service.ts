import { isEmpty } from 'lodash'
import { Company, CompanyModel } from '../company.entity'
import { CompanyQueryDto, CreateCompanyDto, UpdateCompanyDto } from '../dto/company.dto'
import { BadRequestException } from '~/exceptions/bad-request.exception'
import { Pagination } from '~/helpers/paginate/pagination'
import { createPagination } from '~/helpers/paginate/create-pagination'

export class CompanyService {
  async createCompany(body: CreateCompanyDto): Promise<void> {
    const company = new Company(body)
    await company.save()
  }

  async updateCompany(body: UpdateCompanyDto): Promise<void> {
    const { _id, ...dataOther } = body
    await Company.findOneAndUpdate({ _id }, dataOther)
  }

  async getCompanyById(id: string): Promise<CompanyModel> {
    const data = await Company.findById(id)
    if (isEmpty(data)) {
      throw new BadRequestException('Company not found')
    }
    return data
  }

  async deleteCompanyById(id: string): Promise<void> {
    await Company.findByIdAndDelete(id)
  }

  async getCompanyList({ limit, page }: CompanyQueryDto): Promise<Pagination<CompanyModel>> {
    const [items, totalItems] = await Promise.all([
      Company.find({})
        .sort('-createdAt')
        .limit(limit)
        .skip(limit * (page - 1)),
      Company.countDocuments(),
    ])
    return createPagination<CompanyModel>({ items, totalItems, currentPage: Number(page), limit: Number(limit) })
  }
}
