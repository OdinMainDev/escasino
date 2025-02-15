export const getEmailVerificationCode = () => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('setEmailCode');
};
