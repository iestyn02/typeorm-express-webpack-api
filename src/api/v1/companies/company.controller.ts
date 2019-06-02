import { Request, Response, NextFunction } from 'express';
import { CompanyService as Service } from '@services/company.service';

class ProductController {

  public async list(_: Request, res: Response) {
    (
      Service.getAll().then(response => {
        res.jsonp(response);
      }).catch(err => {
        res.send(err);
      })
    )
  };

  public async create(req: Request, res: Response) {
    (
      Service.add(req.body).then(response => {
        res.jsonp(response);
      }).catch(err => {
        res.send(err);
      })
    )
  };

  public async get(req: Request, res: Response, next: NextFunction) {
    (
      Service.getById(req.params.id).then(response => {
        res.jsonp(response);
      }).catch(err => {
        next();
      })
    )
  };

  public async update(req: Request, res: Response, next: NextFunction) {
    (
      Service.updateById(req.params.id, req.body).then(response => {
        res.jsonp(response);
      }).catch(({ message }) => {
        res.jsonp(message);
      })
    )
  };

  public async del(req: Request, res: Response, next: NextFunction) {
    (
      Service.deleteById(req.params.id).then(response => {
        res.jsonp(response);
      }).catch(({ message }) => {
        res.jsonp({ message });
      })
    )
  };

}

export const { list, get, create, update, del } = new ProductController();
