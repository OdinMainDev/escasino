import { ReactNode, useEffect } from 'react';

interface IProps {
  children: ReactNode;
}
const ThemeProvider = ({ children }: IProps) => {
  useEffect(() => {
    if (import.meta.env.VITE_APP_THEME === 'dark') {
      document.body.classList.add('dark');
    }
  }, []);
  return children;
};

export default ThemeProvider;
