export const generateMask = (name: string): string | null => {
  if (name === 'number') {
    return '9999 9999 9999 9999';
  }
  if (name === 'exp_year' || name === 'exp_month') {
    return '99';
  }

  if (name === 'cvc') {
    return '999';
  }
  return null;
};
