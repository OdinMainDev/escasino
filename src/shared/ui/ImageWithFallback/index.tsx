import Image, { ImageProps } from 'next/image';
import { useState, FC } from 'react';

import styles from './styles.module.scss';

interface ImageWithFallbackProps extends ImageProps {
  dummy?: boolean;
}

const ImageWithFallback: FC<ImageWithFallbackProps> = ({ dummy, src, ...props }) => {
  const [imageDummy, setImageDummy] = useState<boolean>(!!dummy);

  const handleError = () => {
    setImageDummy(true);
  };

  if (imageDummy) {
    return (
      <div className={styles.without_image}>
        <div className={styles.without_image_title}>No Image Available</div>
        <div>{props.alt}</div>
      </div>
    );
  }

  return <Image src={src} {...props} onError={handleError} />;
};

export default ImageWithFallback;
