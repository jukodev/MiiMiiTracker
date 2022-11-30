import { Request, Response, NextFunction } from 'express';
export {};
const fs = require('fs');
const bcrypt = require('bcrypt');
const path = require('path');

const requireAuth = (req: Request, res: Response, next: NextFunction): void => {
  const auth = req.header('Authorization');

  const type = auth?.split(' ')[0];
  const credentials = auth?.split(' ')[1];
  if (type !== 'Bearer' || credentials === undefined) {
    const error = new Error();
    error.message = 'Missing token';
    error.name = 'auth.unauthorized';
    res.status(401).json(error);
  } else if (
    bcrypt.compareSync(
      credentials,
      fs.readFileSync(path.join(__dirname, '/../../storage/token')).toString()
    ) === true
  ) {
    next();
  } else {
    const error = new Error();
    error.message = 'Invalid token';
    error.name = 'auth.unauthorized';
    res.status(401).json(error);
  }
};

module.exports = { requireAuth };
