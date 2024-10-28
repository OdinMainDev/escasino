import { ISettings } from '@/shared/models/interfaces/settings';
import { IUserData } from '@/shared/models/interfaces/user';
import { calculateTimeSinceCreation } from './calculateTimeSinceCreation';

export const validateUserDataError = (userData: IUserData, settings: ISettings) => {
  if (calculateTimeSinceCreation(userData) <= Number(import.meta.env.VITE_USER_CREATED_AT_LIMIT)) {
    return 'потому что ваш аккаунт создан менее 24 часов назад';
  }

  if (!new Date(userData.dob) && settings.profile.has_dob) {
    return 'потому что вы не указали год рождения';
  }

  if (!userData.first_name && settings.profile.has_first_name) {
    return 'потому что вы не добавили ваше имя в профиль';
  }

  if (!userData.last_name && settings.profile.has_last_name) {
    return 'потому что вы не добавили вашу фамилию';
  }

  if (!userData.country && settings.profile.has_country) {
    return 'потому что вы не добили вашу страну';
  }

  if (!userData.address && settings.profile.has_address) {
    return 'потому что вы не добили ваш адрес';
  }

  if (!userData.zip && settings.profile.has_zip) {
    return 'потому что вы не добили ваш zip код';
  }

  // if (!userData.email_verified_at && settings.profile.has_email) {
  //   return 'потому что вы не подтвердили адрес электронной почты';
  // }
  // if (!userData.phone_verified_at && settings.profile.has_phone) {
  //   return 'потому что вы не подтвердили номер телефона';
  // }
};

export const validateUserData = (userData: IUserData, settings: ISettings) => {
  if (calculateTimeSinceCreation(userData) <= Number(import.meta.env.VITE_USER_CREATED_AT_LIMIT)) {
    return false;
  }
  if (!new Date(userData.dob) && settings.profile.has_dob) {
    return false;
  }

  if (!userData.first_name && settings.profile.has_first_name) {
    return false;
  }

  if (!userData.last_name && settings.profile.has_last_name) {
    return false;
  }

  if (!userData.country && settings.profile.has_country) {
    return false;
  }

  if (!userData.address && settings.profile.has_address) {
    return false;
  }

  if (!userData.zip && settings.profile.has_zip) {
    return false;
  }

  // if (!userData.email_verified_at && settings.profile.has_email) {
  //   return false;
  // }
  // if (!userData.phone_verified_at && settings.profile.has_phone) {
  //   return false;
  // }

  return true;
};
