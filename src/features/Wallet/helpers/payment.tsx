export const checkAmount = (amout: number, max: number, min: number): boolean => {
  if (amout <= min) {
    return true;
  }

  if (amout > max && max !== 0) {
    return true;
  }

  return false;
};
