export interface IAuthRes {
  success: boolean;
  token: string;
}

export interface IAuthErrorCont {
  [key: string]: string[];
}

export interface IAuthError {
  errors: IAuthErrorCont;
  success: boolean;
}
