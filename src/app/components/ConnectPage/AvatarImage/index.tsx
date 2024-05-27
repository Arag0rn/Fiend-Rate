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

    const isMicrofon = typeof src === 'string' && src.includes("/_next/static/media/microfon.3cda766a.svg");

    console.log(src);

  return (
    // <div className={styles.avatar}>
      <Image
      className={styles.avatar}
      src={src}
      width={search ? 74 : 137}
      height={search ? 92 : 137}
      style={style}
      alt={search ? 'Microfon' : "UserLogo"}
      />
      // </div>
  )
}

export default AvatarImage;