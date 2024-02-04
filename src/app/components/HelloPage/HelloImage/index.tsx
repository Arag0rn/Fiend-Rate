import image from '../../../images/hello-page.svg';
import Image from 'next/image';

const HelloImage = () => {
  return (
    <Image
      src={image}
      width={181}
      height={169}
      alt='Hello page image'
      style={{objectFit: 'cover', objectPosition: 'center'}}
    />
  )
}

export default HelloImage;
