import image from '../../../images/logo.png';
import Image from 'next/image';

const LogoImage = () => {
  return (
    <Image
      src={image}
      width={219}
      height={40}
      quality={100}
      alt='logo'
    />
  )
}

export default LogoImage;
