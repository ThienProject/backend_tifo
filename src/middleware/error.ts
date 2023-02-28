import httpStatus from 'http-status';
import { Request, Response, NextFunction } from 'express';

import ApiError from '../utils/ApiError';

export const errorConverter = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let error = err;
  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode
      ? httpStatus.BAD_REQUEST
      : httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[statusCode];
    error = new ApiError(statusCode, message, err.stack);
  }
  next(error);
};

export const errorHandler = (
  err: any, 
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let { statusCode, message } = err;

  res.locals.errorMessage = err.message;

  const response = {
    code: statusCode,
    message,
    stack: err.stack,
  };

  res.status(statusCode).send(response);
};
