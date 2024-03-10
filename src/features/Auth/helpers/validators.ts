import { ILoginData } from '@/app/api/auth/doLogin';
import { IRegisterData } from '@/app/api/auth/doRegister';
import { IResetData } from '@/app/api/auth/doReset';

export function validateEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return email.length == 0 || emailRegex.test(email);
}

export function validatePhone(phone: string): boolean {
  const phoneRegex = /^\+?[1-9]\d{1,14}$/;
  return phone.length == 0 || phoneRegex.test(phone.trim());
}

export const validatePasswordLength = (password: string): boolean => {
  return password.length == 0 || password.length >= 6;
};

export const validatePasswordMatching = (password: string, repeat_password: string): boolean => {
  if (password.trim() === '' || repeat_password.trim() === '') {
    return false;
  }

  return password.trim() === repeat_password.trim();
};

export const validateRegister = (registerData: IRegisterData): boolean => {
  if (
    (validateEmail(registerData.email) || validatePhone(registerData.phone)) &&
    validatePasswordLength(registerData.password) &&
    validatePasswordMatching(registerData.password, registerData.repeat_password) &&
    registerData.terms &&
    registerData.currency
  ) {
    return true;
  }
  return false;
};

export const validateLogin = (loginData: ILoginData): boolean => {
  if (
    validateEmail(loginData.email) &&
    validatePhone(loginData.phone) &&
    validatePasswordLength(loginData.password)
  ) {
    return true;
  }
  return false;
};

export const validateResetPassword = (resetData: IResetData): boolean => {
  if (resetData.email.length == 0 && resetData.phone.length == 0) {
    return false;
  }
  if (validateEmail(resetData.email) || validatePhone(resetData.phone)) {
    return true;
  }
  return false;
};
