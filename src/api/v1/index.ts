import { Router, Request, Response } from 'express';
import * as ProductRoutes from './products/product.route';
import * as CompanyRoutes from './companies/company.route';

class Routes {
  public router: Router = Router();

  constructor() {
    this.router.use('/products', ProductRoutes);
    this.router.use('/companies', CompanyRoutes);
  }
}

const router: Router = new Routes().router;

export = router;
