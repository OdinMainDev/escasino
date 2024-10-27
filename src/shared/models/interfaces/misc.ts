export interface IResponseError {
  errors: IBasicErrors | string;
  success: boolean;
}

export interface IBasicErrors {
  [key: string]: string[] | string;
}
