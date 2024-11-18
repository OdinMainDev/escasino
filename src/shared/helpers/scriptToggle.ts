const scriptUrl = 'https://cdn.effective-solution.com/sc/lib/eschat.js';
import Cookies from 'js-cookie';
export const toggleScript = () => {
  const supportDiv = document.getElementById('essupport');
  const userToken = Cookies.get('atoken');
  if (supportDiv && userToken) {
    supportDiv.setAttribute('data-user-token', userToken);
  }
  for (const key in window) {
    if (window[key] instanceof WebSocket) {
      window[key].close();
      console.log('WebSocket закрыт:', window[key]);
    }
  }
  const existingScript = document.querySelector(`script[src="${scriptUrl}"]`);
  if (existingScript) {
    existingScript.remove();
  }

  const script = document.createElement('script');
  script.src = scriptUrl;
  script.defer = true;
  document.body.appendChild(script);
};
