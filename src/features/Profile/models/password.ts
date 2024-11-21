export interface IPasswordData {
  fid: string;
  old_password: string;
  password: string;
  repeat_password: string;
}

export interface I2FAPasswordData extends IPasswordData {
  hash: string;
  code: string;
}
