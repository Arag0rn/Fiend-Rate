import image from '../../../images/logo.png';
import Image from 'next/image';

const LogoImage = () => {
  return (
    <Image
      src={image}
      width={219}
      height={44}
      quality={100}
      alt='Hello page image'
    />
  )
}

export default LogoImage;
