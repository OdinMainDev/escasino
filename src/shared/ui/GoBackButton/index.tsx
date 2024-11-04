import classNames from 'classnames';
import { usePathname } from '@/shared/helpers/navigation';
import Icons from '@/shared/ui/Icons';
import { useNavigate } from 'react-router-dom';
import { useCurrentLanguage } from '@/app/providers/LangProvider';
import { removeAllLangsFromUri, useUrlHistory } from '@/app/providers/UrlHistoryProvider';

interface IProps {
  className?: string;
  customPath?: string | undefined;
  // availPaths?: string[] | undefined;
}

const GoBackButton = ({ className, customPath }: IProps) => {
  const pathname = usePathname();
  const navigation = useNavigate();
  const currentLanguage = useCurrentLanguage();
  const {history: fullHistory, resaveHistory} = useUrlHistory();

  const goBack = () => {
    if (fullHistory.length > 1) {
      const historyPath = fullHistory[fullHistory.length - 2];
      customPath = historyPath;
      resaveHistory(fullHistory.slice(0, -2));
    }
    if(customPath == "" || !customPath) customPath = "/";
    customPath = "/" + currentLanguage + removeAllLangsFromUri(customPath);
    navigation(customPath, { replace: true });
  };

  if (pathname == '/') {
    return null;
  }

  return (
    <div onClick={goBack} className={classNames(className, 'cursor-pointer')}>
      <Icons icon="goback" />
    </div>
  );
};

export default GoBackButton;