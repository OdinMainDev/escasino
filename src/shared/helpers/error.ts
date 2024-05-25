import { IResponseError } from '@/shared/models/interfaces/misc';
import { AxiosError, isAxiosError } from 'axios';
import {
  IErrorResponse,
  IErrorResponseObject,
  IErrorResponseString,
} from '../models/interfaces/error';

export const handleErrorStatus = (error: unknown): never => {
  if (isAxiosError(error)) {
    const serverError = error as AxiosError<IResponseError>;
    if (serverError.response) {
      if (serverError.response.status === 422) {
        throw serverError.response.data;
      }
      if (serverError.response.status === 429) {
        throw serverError.response.data;
      }
      throw serverError.response.data || { errors: 'Unknown error', success: false };
    }
  }
  throw { errors: 'Network or unknown error', success: false };
};

export function isErrorResponseString(response: IErrorResponse): response is IErrorResponseString {
  return typeof response.errors === 'string';
}
export function isErrorResponseObject(response: IErrorResponse): response is IErrorResponseObject {
  return typeof response.errors === 'object' && !Array.isArray(response.errors);
}
