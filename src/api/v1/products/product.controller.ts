import { ProductService as Service } from '@services';
import { Request, Response, NextFunction } from 'express';

class ProductController {

  public async list(_: Request, res: Response, next: NextFunction) {
    (
      Service.getAll().then((data: any) => {
        next(data);
      }).catch((err: any) => next(err))
    )
  };

  public async create(req: Request, res: Response, next: NextFunction) {
    (
      Service.add(req.body).then((data: any) => {
        res.status(201);
        next(data);
      }).catch((err: any) => next(err))
    )
  };

  public async get(req: Request, _: Response, next: NextFunction) {
    (
      Service.getById(req.params.id).then((data: any) => {
        next(data);
      }).catch((err: any) => next(err))
    )
  };

  public async update(req: Request, _: Response, next: NextFunction) {
    (
      Service.updateById(req.params.id, req.body).then((data: any) => {
        next(data);
      }).catch((err: any) => next(err))
    )
  };

  public async del(req: Request, _: Response, next: NextFunction) {
    (
      Service.deleteById(req.params.id).then((data: any) => {
        next(data);
      }).catch((err: any) => next(err))
    )
  };

}

export const { list, get, create, update, del } = new ProductController();
