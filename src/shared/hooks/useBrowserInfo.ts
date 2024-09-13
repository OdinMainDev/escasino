import { useState, useEffect } from 'react';

interface BrowserInfo {
  name: string;
  version: string;
  os: string;
}

function useBrowserInfo(): BrowserInfo {
  const [browserInfo, setBrowserInfo] = useState<BrowserInfo>({
    name: 'Unknown',
    version: 'Unknown',
    os: 'Unknown',
  });

  useEffect(() => {
    const getBrowserInfo = (): void => {
      const ua = navigator.userAgent;

      // Определяем операционную систему
      const os = (() => {
        if (/Windows NT 10.0/i.test(ua)) return 'Windows 10';
        if (/Windows NT 6.2/i.test(ua)) return 'Windows 8';
        if (/Windows NT 6.1/i.test(ua)) return 'Windows 7';
        if (/Mac OS X/i.test(ua)) return 'macOS';
        if (/Android/i.test(ua)) return 'Android';
        if (/iPhone|iPad|iPod/i.test(ua)) return 'iOS';
        return 'Unknown';
      })();

      // Определяем название и версию браузера
      const browser = (() => {
        let name: string = 'Unknown';
        let version: string = 'Unknown';

        const edgeMatch = ua.match(/(edge|edg|edga|edgios)\/([\d.]+)/i);
        const operaMatch = ua.match(/(opr)\/([\d.]+)/i);
        const chromeMatch = ua.match(/(chrome)\/([\d.]+)/i);
        const firefoxMatch = ua.match(/(firefox)\/([\d.]+)/i);
        const safariMatch = ua.match(/version\/([\d.]+).*safari/i);
        const ieMatch = ua.match(/(msie) ([\d.]+)/i) || ua.match(/trident.*rv:([\d.]+)/i);

        if (edgeMatch) {
          name = 'Microsoft Edge';
          version = edgeMatch[2];
        } else if (operaMatch) {
          name = 'Opera';
          version = operaMatch[2];
        } else if (chromeMatch) {
          name = 'Google Chrome';
          version = chromeMatch[2];
        } else if (firefoxMatch) {
          name = 'Mozilla Firefox';
          version = firefoxMatch[2];
        } else if (safariMatch) {
          name = 'Safari';
          version = safariMatch[1];
        } else if (ieMatch) {
          name = 'Internet Explorer';
          version = ieMatch[2] || ieMatch[1];
        }

        return { name, version };
      })();

      setBrowserInfo({
        name: browser.name,
        version: browser.version,
        os: os,
      });
    };

    getBrowserInfo();
  }, []);

  return browserInfo;
}

export default useBrowserInfo;
