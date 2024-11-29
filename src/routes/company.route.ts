import { CompanyController } from '~/modules/company/controllers/company.controller'
import { BaseRoute } from './base.route'

export class CompanyRoute extends BaseRoute {
  private companyController: CompanyController

  constructor() {
    super()
    this.companyController = new CompanyController()
    this.initializeRoutes()
  }

  protected initializeRoutes(): void {
    this.router
      .get('/list', this.companyController.list)
      .post('/create', this.companyController.create)
      .put('/update', this.companyController.update)
      .get('/:companyId', this.companyController.detail)
      .delete('/:companyId', this.companyController.delete)
  }
}
