import '@/app/assets/styles/global.scss';
import './styles.scss';
import './preloader.scss';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div>
      {/* <div className="device">
        <div className="device__a">
          <div className="device__a-1"></div>
          <div className="device__a-2"></div>
        </div>
        <div className="device__b"></div>
        <div className="device__c"></div>
        <div className="device__d"></div>
        <div className="device__e"></div>
        <div className="device__f"></div>
        <div className="device__g"></div>
      </div> */}
      <div className="desktop-container">
        <div className="desktop-wrapper">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
