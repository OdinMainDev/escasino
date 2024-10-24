import { useEffect, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

import styles from './Form.module.scss';
import { FB, OK, Telegram, Twitter, VK } from '../Icons';
import {
  validatePasswordLength,
  validatePasswordMatching,
  validatePhone,
} from '@/features/Auth/helpers/validators';

import Loader from '@/shared/ui/Loader';
import Input from '@/shared/ui/Input';
import Button from '@/shared/ui/Button';
import { useAuthProvider } from '@/app/providers/AuthProvider';
import Checkbox from '@/shared/ui/Checkbox';
import { getVisitorId } from '@/shared/helpers/getVisitorId';
import { useAppDispatch, useAppSelector } from '@/store/hooks/redux';
import { IRegisterData, doRegisterApi, sampleIRegisterData } from '@/app/api/auth/doRegister';
import { Link } from 'react-router-dom';
import Select, { ISelectOption } from '@/shared/ui/Select';
import { isAppDebug } from '@/app/config/app';
import classNames from 'classnames';
import { getCountries } from '@/store/slices/countriesSlice';
import { genderSelect } from '@/app/constants/genders';
import { IResponseError } from '@/shared/models/interfaces/misc';
import { ErrorResponseAsString } from '@/app/api/helpers';
import Tabs from '@/entities/Tabs';
import { useTranslation } from 'react-i18next';
import { useRouter } from '@/shared/helpers/navigation';

interface IProps {
  openLoginModal: () => void;
}

const AuthRegisterForm = ({ openLoginModal }: IProps) => {
  const { t } = useTranslation();
  const { settings, loading: loadingSettings } = useAppSelector((state) => state.settingsReducer);
  const { isAuth, setAuthenticated } = useAuthProvider();
  const [loader, setLoader] = useState<boolean>(false);
  const [errorData, setErrorData] = useState<IResponseError>();
  const [registerData, setRegisterData] = useState<IRegisterData>(sampleIRegisterData);
  const [selectedType, setSelectedType] = useState('email');
  const router = useRouter();
  const {
    isFinished: isFinishedCountries,
    loading: loadingCountries,
    countries,
  } = useAppSelector((state) => state.countriesReducer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!loadingCountries && !isFinishedCountries) {
      void dispatch(getCountries());
    }
  }, [dispatch, isFinishedCountries, loadingCountries]);

  const formType =
    settings?.auth.register.phone && settings?.auth.register.email
      ? 'full'
      : settings?.auth.register.phone
        ? 'phone'
        : 'email';
  const hasSocials =
    settings?.auth.social_vk ||
    settings?.auth.social_ok ||
    settings?.auth.social_fb ||
    settings?.auth.social_tg ||
    settings?.auth.social_tw;
  const hasUsername = settings?.auth.register.username;
  const hasFullName = settings?.auth.register.full_name;
  const hasCity = settings?.auth.register.city;
  const hasDob = settings?.auth.register.dob;
  const hasAddress = settings?.auth.register.address;
  const hasGender = settings?.auth.register.gender;
  const hasPromo = settings?.auth.register.promo;

  const isFastAuth = !!settings?.auth.register.use_fast_auth;

  // OVERRIDE FOR TESTS
  // const formType = 'full';
  // const hasSocials = false;
  // const hasUsername = true;
  // const hasFullName = true;
  // const hasCity = true;
  // const hasDob = true;
  // const hasAddress = true;
  // const hasGender = true;
  // const hasPromo = true;

  let currenciesList: ISelectOption[] = [{ value: 'PLN', label: 'PLN', disabled: false }];

  if (!settings || settings.currencies.length == 0) {
    currenciesList = [{ value: 'PLN', label: 'PLN', disabled: false }];
  } else if (settings.currencies.length == 1) {
    currenciesList = [
      { value: settings.currencies[0], label: settings.currencies[0], disabled: false },
    ];
  } else if (settings.currencies.length > 1) {
    currenciesList = [
      { value: '', label: t('chooseCurrency'), disabled: true },
      ...settings.currencies.map((item) => ({ label: item, value: item })),
    ];
  }

  let countriesList: ISelectOption[] = [];

  if (countries.length == 0) {
    countriesList = [{ value: '', label: t('countriesLoading'), disabled: true }];
  } else if (countries.length == 1) {
    countriesList = [{ value: countries[0], label: countries[0], disabled: false }];
  } else {
    countriesList = [
      { value: '', label: t('yourCountry'), disabled: true },
      ...countries.map((item) => ({ label: item, value: item })),
    ];
  }

  const sendData = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      e.preventDefault();
      setLoader(true);
      const fid = await getVisitorId();
      const postData = { ...registerData, fid };
      if (currenciesList.length == 1) {
        postData.currency = settings?.currencies[0] ? settings?.currencies[0] : '';
      }
      const data = await doRegisterApi(postData);
      setAuthenticated(data.token);
      const supportDiv = document.getElementById('essupport');
      if (supportDiv) {
        supportDiv.setAttribute('data-user-token', data.token);
      }
      router.push('/profile/edit');
    } catch (e: unknown) {
      const regError = e as IResponseError;
      const regErrorList = Object.keys(regError.errors);
      if (!Array.isArray(regErrorList)) {
        return;
      }
      setErrorData(regError);
    } finally {
      setLoader(false);
    }
  };

  return (
    <form className={styles.container}>
      {(loader || loadingSettings || isAuth || !settings) && (
        <div className={styles.loader_container}>
          <Loader />
        </div>
      )}
      <div className={styles.title}>{t('registerNewPlayer')}</div>
      <div className="row">
        {formType === 'full' && (
          <Tabs
            className="mb-[36px]"
            value={selectedType}
            onChange={(value) => setSelectedType(value.value.toString())}
            tabs={[
              {
                value: 'email',
                label: t('email'),
              },
              {
                value: 'phone',
                label: t('phone'),
              },
            ]}
          />
        )}
        <div className="tab">
          {(formType === 'full' && selectedType === 'email') || formType === 'email' ? (
            <Input
              placeholder={t('email')}
              type="email"
              onChange={(e) => {
                setRegisterData((prev) => ({ ...prev, email: e.target.value }));
                if (!isAppDebug) {
                  setRegisterData((prev) => ({ ...prev, phone: '' }));
                }
              }}
              containerClassName="mb-[10px]"
              isError={
                (typeof errorData?.errors === 'object' && !!errorData.errors['email' as string]) ||
                errorData?.errors === 'UserWithSameCredentialsAlreadyExists'
              }
              message={
                errorData?.errors === 'UserWithSameCredentialsAlreadyExists'
                  ? ErrorResponseAsString(
                      'UserWithSameCredentialsAlreadyExists',
                      'Такой пользователь уже существует!',
                      errorData,
                    )
                  : ErrorResponseAsString('email', t('enterCorrectEmail'), errorData)
              }
            />
          ) : null}
          {(formType === 'full' && selectedType === 'phone') || formType === 'phone' ? (
            <Input
              placeholder={t('phone')}
              type="phone"
              onChangePhone={(value) => {
                setRegisterData((prev) => ({ ...prev, phone: value }));
                if (!isAppDebug) {
                  setRegisterData((prev) => ({ ...prev, email: '' }));
                }
              }}
              containerClassName="mb-[10px]"
              validationFunction={validatePhone}
              isError={typeof errorData?.errors === 'object' && !!errorData?.errors['phone']}
              message={ErrorResponseAsString('phone', t('enterCorrectPhone'), errorData)}
            />
          ) : null}
        </div>
        <div className={styles.input_label}>{t('willUseAsLogin')}</div>
      </div>

      {!isFastAuth && (
        <>
          <Input
            placeholder={t('password')}
            type="password"
            isError={typeof errorData?.errors === 'object' && !!errorData?.errors['password']}
            containerClassName={styles.input}
            value={registerData.password}
            validationFunction={validatePasswordLength}
            message={ErrorResponseAsString('password', t('enterCorrectPassword'), errorData)}
            onChange={(e) => setRegisterData((prev) => ({ ...prev, password: e.target.value }))}
          />
          <Input
            placeholder={t('confirmPassword')}
            type="password"
            isError={
              typeof errorData?.errors === 'object' && !!errorData?.errors['repeat_password']
            }
            containerClassName={styles.input}
            validationFunction={(value) => validatePasswordMatching(registerData.password, value)}
            message={ErrorResponseAsString('repeat_password', t('enterCorrectPassword'), errorData)}
            onChange={(e) =>
              setRegisterData((prev) => ({ ...prev, repeat_password: e.target.value }))
            }
          />
        </>
      )}
      {currenciesList.length > 1 ? (
        <Select
          isError={typeof errorData?.errors === 'object' && !!errorData?.errors['currency']}
          optionList={currenciesList}
          value={registerData.currency}
          containerClassName={styles.input}
          message={ErrorResponseAsString('currency', t('enterCorrectCurrency'), errorData)}
          onChange={(e) => setRegisterData((prev) => ({ ...prev, currency: e.target.value }))}
        />
      ) : (
        ''
      )}
      {hasUsername && (
        <Input
          placeholder={'Username'}
          type={'text'}
          containerClassName={styles.input}
          isError={typeof errorData?.errors === 'object' && !!errorData?.errors['username']}
          message={ErrorResponseAsString('username', t('enterCorrectUsername'), errorData)}
          onChange={(e) => setRegisterData((prev) => ({ ...prev, username: e.target.value }))}
        />
      )}

      {/* Тут красиво группировать */}
      {hasFullName && (
        <div className="tab">
          <Input
            placeholder={t('lastName')}
            type={'text'}
            containerClassName={styles.input}
            isError={typeof errorData?.errors === 'object' && !!errorData?.errors['last_name']}
            message={ErrorResponseAsString('last_name', t('enterCorrectLastName'), errorData)}
            onChange={(e) => setRegisterData((prev) => ({ ...prev, last_name: e.target.value }))}
          />
          <Input
            placeholder={t('firstName')}
            type={'text'}
            containerClassName={styles.input}
            isError={typeof errorData?.errors === 'object' && !!errorData?.errors['first_name']}
            message={ErrorResponseAsString('first_name', t('enterCorrectFirstName'), errorData)}
            onChange={(e) => setRegisterData((prev) => ({ ...prev, first_name: e.target.value }))}
          />
          <Input
            placeholder={t('fatherName')}
            type={'text'}
            containerClassName={styles.input}
            isError={typeof errorData?.errors === 'object' && !!errorData?.errors['second_name']}
            message={ErrorResponseAsString('second_name', t('enterCorrectFatherName'), errorData)}
            onChange={(e) => setRegisterData((prev) => ({ ...prev, second_name: e.target.value }))}
          />
        </div>
      )}
      {hasCity && (
        <div className="tab">
          <Select
            isError={typeof errorData?.errors === 'object' && !!errorData?.errors['country']}
            optionList={countriesList}
            value={registerData.country}
            containerClassName={styles.input}
            message={ErrorResponseAsString('second_name', t('countryFromList'), errorData)}
            onChange={(e) => setRegisterData((prev) => ({ ...prev, country: e.target.value }))}
          />
          <Input
            placeholder={t('city')}
            type={'text'}
            containerClassName={styles.input}
            isError={typeof errorData?.errors === 'object' && !!errorData?.errors['city']}
            message={ErrorResponseAsString('city', t('enterCorrectCity'), errorData)}
            onChange={(e) => setRegisterData((prev) => ({ ...prev, city: e.target.value }))}
          />
        </div>
      )}

      {hasDob && (
        <Input
          placeholder={t('birthDate')}
          type="datetime-local"
          containerClassName={styles.input}
          isError={typeof errorData?.errors === 'object' && !!errorData?.errors['dob']}
          message={ErrorResponseAsString('dob', t('enterCorrectBirthDate'), errorData)}
          onChange={(e) => {
            const inputDate = new Date(e.target.value);
            const timestamp = Math.floor(inputDate.getTime() / 1000);
            setRegisterData((prev) => ({ ...prev, dob: timestamp }));
          }}
        />
      )}

      {/* Тут красиво группировать */}
      {hasAddress && (
        <div className="tab">
          <Input
            placeholder={t('address')}
            type={'text'}
            containerClassName={styles.input}
            isError={typeof errorData?.errors === 'object' && !!errorData?.errors['address']}
            message={ErrorResponseAsString('address', t('enterCorrectAddress'), errorData)}
            onChange={(e) => setRegisterData((prev) => ({ ...prev, address: e.target.value }))}
          />
          <Input
            placeholder={t('mailIndex')}
            type={'text'}
            containerClassName={styles.input}
            isError={typeof errorData?.errors === 'object' && !!errorData?.errors['zip']}
            message={ErrorResponseAsString('zip', t('enterCorrectMailIndex'), errorData)}
            onChange={(e) => setRegisterData((prev) => ({ ...prev, zip: e.target.value }))}
          />
        </div>
      )}

      {hasGender && (
        <Select
          isError={typeof errorData?.errors === 'object' && !!errorData?.errors['gender']}
          optionList={genderSelect}
          value={registerData.gender}
          containerClassName={styles.input}
          message={ErrorResponseAsString('zip', t('enterCorrectGender'), errorData)}
          onChange={(e) => setRegisterData((prev) => ({ ...prev, gender: e.target.value }))}
        />
      )}
      {hasPromo && (
        <div className={classNames(styles.checkbox, styles.promo)}>
          <Checkbox
            value={registerData.promo}
            label={t('agreePromocode')}
            onChange={(value) => setRegisterData((prev) => ({ ...prev, promo: value }))}
          />
        </div>
      )}

      <div className={styles.checkbox}>
        <Checkbox
          isError={typeof errorData?.errors === 'object' && !!errorData?.errors['terms']}
          value={registerData.terms}
          label={
            <span>
              {t('familiarized')}{' '}
              <Link to="/rules" className="underline">
                {t('termsConditions')}
              </Link>
            </span>
          }
          onChange={(value) => setRegisterData((prev) => ({ ...prev, terms: value }))}
        />
      </div>
      <div className={styles.line}></div>
      {hasSocials ? (
        <div>
          <div className={styles.subtitle}>{t('usingSocials')}</div>
          <div className={styles.social}>
            <VK />
            <Telegram />
            <OK />
            <Twitter />
            <FB />
          </div>
        </div>
      ) : (
        ''
      )}

      {settings?.auth.register.captcha && (
        <ReCAPTCHA
          className={styles.captcha}
          sitekey={settings?.captcha_site_key ?? ''}
          onChange={(value: string | null) =>
            setRegisterData((prev) => ({ ...prev, captcha: value ?? '' }))
          }
        />
      )}
      <Button
        type="submit"
        className={styles.button}
        onClick={(e) => {
          void sendData(e);
        }}
      >
        {t('signUp')}
      </Button>
      <div className={styles.label}>
        {t('haveAccount')} <span onClick={openLoginModal}>{t('enter')}</span>
      </div>
    </form>
  );
};

export default AuthRegisterForm;
