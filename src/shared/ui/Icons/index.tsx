import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faCog, faCircleExclamation, faFilter, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { faEye, faEyeSlash, faStar, faComments, faFile, faPenToSquare } from '@fortawesome/free-regular-svg-icons'

interface IProps {
  icon: 'search' | 'eye' | 'eye-off' | 'star' | 'settings' | 'chat' | 'file' | 'edit' | 'warning' | 'filter' | 'goback';
}

const Icons = ({ icon }: IProps) => {
  if (icon === 'search') {
    return (
      <FontAwesomeIcon icon={faSearch}/>
    );
  }

  if (icon === 'eye-off') {
    return (
      <FontAwesomeIcon icon={faEyeSlash}/>
    );
  }

  if (icon === 'eye') {
    return (
      <FontAwesomeIcon icon={faEye}/>
    );
  }

  if (icon === 'star') {
    return (
      <FontAwesomeIcon icon={faStar}/>
    );
  }

  if (icon === 'settings') {
    return (
      <FontAwesomeIcon icon={faCog}/>
    );
  }

  if (icon === 'chat') {
    return (
      <FontAwesomeIcon icon={faComments}/>
    );
  }

  if (icon === 'file') {
    return (
      <FontAwesomeIcon icon={faFile}/>
    );
  }

  if (icon === 'edit') {
    return (
      <FontAwesomeIcon icon={faPenToSquare}/>
    );
  }

  if (icon === 'warning') {
    return (
      <FontAwesomeIcon icon={faCircleExclamation}/>
    );
  }

  if (icon === 'filter') {
    return (
      <FontAwesomeIcon icon={faFilter}/>
    );
  }

  if (icon === 'goback') {
    return (
      <FontAwesomeIcon icon={faArrowLeft}/>
    );
  }

  return null;
};

export default Icons;
