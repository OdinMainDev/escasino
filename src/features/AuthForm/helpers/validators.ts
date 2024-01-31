export function validateEmail(email: string): boolean {
  if (email.trim() === '') {
    return true;
  }
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailRegex.test(email);
}

export const validatePasswordLength = (password: string): boolean => {
  if (password.trim() === '') {
    return true;
  }

  return password.length >= 8;
};

export const validatePasswordMatching = (password: string, repeat_password: string): boolean => {
  if (password.trim() === '' || repeat_password.trim() === '') {
    return true;
  }

  return password.trim() === repeat_password.trim();
};
