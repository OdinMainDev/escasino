import { ILoginData } from '@/app/api/auth/doLogin';
import { IRegisterData } from '@/app/api/auth/doRegister';
import { IResetData } from '@/app/api/auth/doReset';
import { IResetSetPasswordData } from '@/app/api/auth/doResetSetPassword';
import { Register } from '@/shared/models/interfaces/settings';

export function validateEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailRegex.test(email);
}

export function validatePhone(phone: string): boolean {
  const phoneRegex = /^\d{5,}$/; 
  return phoneRegex.test(phone.trim());
}



export const validatePasswordLength = (password: string): boolean => {
  return password.length >= 6;
};

export const validatePasswordMatching = (password: string, repeat_password: string): boolean => {
  if (repeat_password.trim() === '') {
    return false;
  }

  return password.trim() === repeat_password.trim();
};

export const validateRegister = (
  registerData: IRegisterData,
  formConfig: Register | undefined,
  isFastAuth: boolean,
): boolean => {
  if (formConfig) {
    for (const key in formConfig) {
      if (key == 'use_fast_auth') {
        continue;
      }
      if (formConfig[key as keyof typeof formConfig] && !registerData[key as keyof IRegisterData]) {
        console.log(`Field ${key} is required but not provided.`);
        return false;
      }
    }
  }
  if (
    (validateEmail(registerData.email) || validatePhone(registerData.phone)) &&
    (isFastAuth ||
      (validatePasswordLength(registerData.password) &&
        validatePasswordMatching(registerData.password, registerData.repeat_password))) &&
    registerData.terms
  ) {
    return true;
  }
  return false;
};

export const validateLogin = (loginData: ILoginData): boolean => {
  if (
    (validateEmail(loginData.email) || validatePhone(loginData.phone)) &&
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

export const validateResetSetPassword = (resetData: IResetSetPasswordData): boolean => {
  if (validatePasswordMatching(resetData.password, resetData.repeat_password)) {
    return true;
  }
  return false;
};
