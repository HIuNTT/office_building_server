import { IRequestBody, IRequestParams, IRequestQuery } from '~/interfaces/request.interface'
import { CompanyService } from '../services/company.service'
import { CompanyQueryDto, CreateCompanyDto, UpdateCompanyDto } from '../dto/company.dto'
import { NextFunction, Response } from 'express'
import { ResOp } from '~/helpers/response.helper'

export class CompanyController {
  private companyService: CompanyService

  constructor() {
    this.companyService = new CompanyService()
  }

  create = async (req: IRequestBody<CreateCompanyDto, keyof CreateCompanyDto>, res: Response, next: NextFunction) => {
    try {
      await this.companyService.createCompany(req.body)
      res.send(new ResOp(null))
    } catch (error) {
      next(error)
    }
  }

  update = async (req: IRequestBody<UpdateCompanyDto, keyof UpdateCompanyDto>, res: Response, next: NextFunction) => {
    try {
      await this.companyService.updateCompany(req.body)
      res.send(new ResOp(null))
    } catch (error) {
      next(error)
    }
  }

  detail = async (req: IRequestParams<{ companyId: string }>, res: Response, next: NextFunction) => {
    try {
      const company = await this.companyService.getCompanyById(req.params.companyId)
      res.send(new ResOp(company))
    } catch (error) {
      next(error)
    }
  }

  delete = async (req: IRequestParams<{ companyId: string }>, res: Response, next: NextFunction) => {
    try {
      await this.companyService.deleteCompanyById(req.params.companyId)
      res.send(new ResOp(null))
    } catch (error) {
      next(error)
    }
  }

  list = async (req: IRequestQuery<CompanyQueryDto>, res: Response, next: NextFunction) => {
    console.log(req.query)
    try {
      const data = await this.companyService.getCompanyList(req.query)
      res.send(new ResOp(data))
    } catch (error) {
      next(error)
    }
  }
}
