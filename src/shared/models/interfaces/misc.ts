export interface IResponseError {
  errors: IBasicErrors;
  success: boolean;
}

export interface IBasicErrors {
  [key: string]: string[];
}
