import { IResponseError } from '@/shared/models/interfaces/misc';
import { isAxiosError } from 'axios';
import {
  IErrorResponse,
  IErrorResponseObject,
  IErrorResponseString,
} from '../models/interfaces/error';

export const handleErrorStatus = (error: unknown): never => {
  if (isAxiosError<IResponseError>(error)) {
    if (error.response) {
      const { status, data } = error.response;
      if (status === 422 || status === 429) {
        throw data;
      }
      throw data || { errors: 'Unknown error', success: false };
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
