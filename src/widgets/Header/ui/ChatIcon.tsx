import Icons from '@/shared/ui/Icons';
import { useEffect } from 'react';

const ChatIcon = () => {
  useEffect(() => {
    const handleIconClick = () => {
      const vanillaButton = document.getElementById('essupportchatwidgetButtonOpenId');
      if (vanillaButton) {
        vanillaButton.click();
      }
    };
    const icon = document.getElementById('escasinoChatIconButtonId');
    if (icon) {
      icon.addEventListener('click', handleIconClick);
    }
    return () => {
      if (icon) {
        icon.removeEventListener('click', handleIconClick);
      }
    };
  }, []);

  return (
    <div className="cursor-pointer" id="escasinoChatIconButtonId">
      <Icons icon="chat" />
    </div>
  );
};

export default ChatIcon;
