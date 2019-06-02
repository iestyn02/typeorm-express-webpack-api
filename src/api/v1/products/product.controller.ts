import { ProductService as Service } from '@services/product.service';
import { Request, Response, NextFunction } from 'express';

class ProductController {

  public async list(_: Request, res: Response, next: NextFunction) {
    (
      Service.getAll().then(response => {
        res.jsonp(response);
      }).catch(err => {
        res.jsonp(err);
      })
    )
  };

  public async create(req: Request, res: Response) {
    (
      Service.add(req.body).then(response => {
        res.jsonp(response);
      }).catch(err => {
        res.jsonp(err);
      })
    )
  };

  public async get(req: Request, res: Response, next: NextFunction) {
    (
      Service.getById(req.params.id).then(response => {
        res.jsonp(response);
      }).catch(err => {
        res.status(err.status).jsonp(err);
      })
    )
  };

  public async update(req: Request, res: Response, next: NextFunction) {
    (
      Service.updateById(req.params.id, req.body).then(response => {
        res.jsonp(response);
      }).catch(err => {
        res.jsonp(err);
      })
    )
  };

  public async del(req: Request, res: Response, next: NextFunction) {
    (
      Service.deleteById(req.params.id).then(response => {
        res.jsonp({ data: Number(response) });
      }).catch(err => {
        res.status(err.status).jsonp({ error: err });
      })
    )
  };

}

export const { list, get, create, update, del } = new ProductController();
