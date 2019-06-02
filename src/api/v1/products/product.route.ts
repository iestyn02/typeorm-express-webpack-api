import { Router } from 'express';

import { list, create, get, update, del } from "./product.controller";

class Routes {
  public router: Router = Router({ mergeParams: true });

  constructor() {
    this.router.route('/')
      .get(list)
      .post(create)

    this.router.route('/:id')
      .get(get)
      .patch(update)
      .delete(del)
  }
}

const router: Router = new Routes().router;

export = router;
