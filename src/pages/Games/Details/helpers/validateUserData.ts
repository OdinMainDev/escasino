import { ISettings } from '@/shared/models/interfaces/settings';
import { IUserData } from '@/shared/models/interfaces/user';
import { calculateTimeSinceCreation } from './calculateTimeSinceCreation';

export const validateUserDataError = (userData: IUserData, settings: ISettings) => {
  if (calculateTimeSinceCreation(userData) <= Number(import.meta.env.VITE_USER_CREATED_AT_LIMIT)) {
    if (!new Date(userData.dob) && settings.profile.has_dob) {
      return 'causeYouDontSpecifiedDob';
    }

    if (!userData.first_name && settings.profile.has_first_name) {
      return 'causeYouDontAddYourNameToProfile';
    }

    if (!userData.last_name && settings.profile.has_last_name) {
      return 'causeYouDontAddYourSecondName';
    }

    if (!userData.country && settings.profile.has_country) {
      return 'causeYouDontAddYourCountry';
    }

    if (!userData.address && settings.profile.has_address) {
      return 'causeYouDontAddYourAddress';
    }

    if (!userData.zip && settings.profile.has_zip) {
      return 'causeYouDontAddYourZipCode';
    }

    if (!userData.email_verified_at && settings.profile.has_email) {
      return 'causeYouDontConfirmEmail';
    }
  }
};

export const validateUserData = (userData: IUserData, settings: ISettings) => {
  if (calculateTimeSinceCreation(userData) <= Number(import.meta.env.VITE_USER_CREATED_AT_LIMIT)) {
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

    if (!userData.email_verified_at && settings.profile.has_email) {
      return false;
    }
  }
  return true;
};
