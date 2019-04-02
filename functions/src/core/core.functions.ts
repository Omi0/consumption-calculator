import * as functions from 'firebase-functions';
import * as joi from 'joi';
import { ApiResponse } from './core.models';

/**
 * Normalizing Error Response
 *
 * @param res <Response>
 * @param error <any>
 * @param code <number>
 */
export function errorResponse(
  res: functions.Response,
  error: any,
  code?: number
): functions.Response {
  console.log(error);
  if (
    error &&
    typeof error === 'object' &&
    error.isJoi &&
    error.name &&
    error.details
  ) {
    const validationError: joi.ValidationError = error;
    return res.status(400).json(<ApiResponse>{
      status: validationError.name,
      message: error.message,
      errors: validationError.details.map(err => {
        return {
          source: err.path.join('.'),
          title: validationError.name,
          detail: err.message
        };
      })
    });
  } else if (error && typeof error === 'string' && code) {
    return res.status(code).json(<ApiResponse>{
      message: error
    });
  } else {
    return res.status(500).json(<ApiResponse>{
      status: error.status || error.statusText || error.name,
      message: error.message
    });
  }
}
