import Image, { StaticImageData } from 'next/image';
import styles from './styles.module.scss';
import { CSSProperties } from 'react';

const AvatarImage = (
  {
    isConnected,
    src,
    search,
    style,
  }:
  {
    isConnected?: boolean,
    src: string | StaticImageData,
    group?: boolean,
    search: boolean,
    style?: CSSProperties,
  }) => {
  return (
      <Image
        className={styles.avatar}
        src={src}
        style={style}
        alt="Microfon"
      />
  )
}

export default AvatarImage;