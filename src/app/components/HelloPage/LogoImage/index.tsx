import image from '../../../images/logo.png';
import Image from 'next/image';

const LogoImage = () => {
  return (
    <Image
      src={image}
      width={181}
      height={44}
      alt='Hello page image'
      style={{objectFit: 'cover', objectPosition: 'center'}}
    />
  )
}

export default LogoImage;
