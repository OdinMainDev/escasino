export const autoCompleteHandler = (type: string): string | undefined => {
  switch (type) {
    case 'password':
      return 'current-password';
    case 'email':
      return 'username';
    case 'phone':
      return 'phone';
    default:
      return undefined;
  }
};
