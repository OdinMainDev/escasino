export const getEmailVerificationCode = () => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('setEmailCode');
};

export const getSearchQuery = () => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('query');
};


