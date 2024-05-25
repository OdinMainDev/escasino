export interface IErrorObject {
  [key: string]: string[];
}

interface IBaseResponse {
  success: boolean;
}

export type IErrorResponse = IErrorResponseString | IErrorResponseObject;

export interface IErrorResponseString extends IBaseResponse {
  errors: string;
}

export interface IErrorResponseObject extends IBaseResponse {
  errors: IErrorObject;
}
