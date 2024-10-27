export const generateErrorMessages = (name: string): string => {
  if (name === 'exp_year') {
    return 'enterCorrectDate';
  }

  if (name === 'exp_month') {
    return 'enterCorrectDate';
  }

  if (name === 'cvc') {
    return 'enterCorrectCvc';
  }

  if (name === 'exp_month') {
    return 'enterCorrectCvc';
  }

  if (name === 'number') {
    return 'enterCorrectCardNumber';
  }

  return 'fillThisFiled';
};
