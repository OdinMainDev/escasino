import Icons from '@/shared/ui/Icons';
import { useEffect } from 'react';

const ChatIcon = () => {
  useEffect(() => {
    const vanillaButton = document.getElementById('essupportchatwidgetButtonOpenId');
    const handleIconClick = () => {
      if (vanillaButton) {
        alert("OK1");
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
