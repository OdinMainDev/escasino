export const generateErrorMessages = (name: string): string => {
  if (name === 'exp_year') {
    return 'Введите корректную дату';
  }

  if (name === 'exp_month') {
    return 'Введите корректную дату';
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
