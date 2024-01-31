import { ILoginData } from '../models/login';
import { IRegisterData } from '../models/register';

export function validateEmail(email: string): boolean {
  if (email.trim() === '') {
    return true;
  }
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailRegex.test(email);
}

export const validatePasswordLength = (password: string): boolean => {
  if (password.trim() === '') {
    return true;
  }

  return password.length >= 8;
};

export const validatePasswordMatching = (password: string, repeat_password: string): boolean => {
  if (password.trim() === '' || repeat_password.trim() === '') {
    return true;
  }

  return password.trim() === repeat_password.trim();
};

export const validateRegister = (registerData: IRegisterData): boolean => {
  if (
    validateEmail(registerData.email) &&
    validatePasswordLength(registerData.password) &&
    validatePasswordMatching(registerData.password, registerData.repeat_password) &&
    registerData.terms &&
    registerData.currency
  ) {
    return true;
  }
  return false;
};

export const validatLogin = (loginData: ILoginData): boolean => {
  if (
    validateEmail(loginData.email) &&
    validatePasswordLength(loginData.password) &&
    loginData.captcha
  ) {
    return true;
  }
  return false;
};
