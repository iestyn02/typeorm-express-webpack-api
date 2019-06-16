import { Request, Response, NextFunction } from 'express';
import { CompanyService as Service } from '@services';

class ProductController {

  public async list(_: Request, res: Response, next: NextFunction) {
    (
      Service.getAll().then(data => {
        next(data);
      }).catch(err => next(err))
    )
  };

  public async create(req: Request, res: Response, next: NextFunction) {
    (
      Service.add(req.body).then(data => {
        res.status(201);
        next(data);
      }).catch(err => next(err))
    )
  };

  public async get(req: Request, res: Response, next: NextFunction) {
    (
      Service.getById(req.params.id).then(data => {
        next(data);
      }).catch(err => next(err))
    )
  };

  public async update(req: Request, res: Response, next: NextFunction) {
    (
      Service.updateById(req.params.id, req.body).then(data => {
        next(data);
      }).catch(err => next(err))
    )
  };

  public async del(req: Request, res: Response, next: NextFunction) {
    (
      Service.deleteById(req.params.id).then(data => {
        next(data);
      }).catch(err => next(err))
    )
  };

}

export const { list, get, create, update, del } = new ProductController();
