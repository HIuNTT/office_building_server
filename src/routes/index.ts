import { Router } from 'express'
import { AuthRoute } from './auth.route'
import { CompanyRoute } from './company.route'

interface IRoute {
  path: string
  route: Router
}

const router = Router()

const authRoute = new AuthRoute()
const companyRoute = new CompanyRoute()

const routes: IRoute[] = [
  {
    path: '/auth',
    route: authRoute.router,
  },
  {
    path: '/company',
    route: companyRoute.router,
  },
]

routes.forEach((route) => router.use(route.path, route.route))

export default router
