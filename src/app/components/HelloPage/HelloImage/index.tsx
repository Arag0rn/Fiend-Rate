import image from '../../../images/hello-page.png';
import Image from 'next/image';

const HelloImage = () => {
  return (
    <Image
      src={image}
      width={181}
      height={169}
      quality={100}
      alt='Happy palce'
    />
  )
}

export default HelloImage;
