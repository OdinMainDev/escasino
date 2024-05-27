export const generateErrorMessages = (name: string): string => {
  if (name === 'exp_year') {
    return 'Введите корректный год';
  }

  if (name === 'exp_month') {
    return 'Введите корректный месяц';
  }

  if (name === 'cvc') {
    return 'Введите корректный cvc';
  }

  if (name === 'exp_month') {
    return 'Введите корректный cvc';
  }

  if (name === 'number') {
    return 'Введите корректный номер карты';
  }

  return 'Заполитне это поле';
};
