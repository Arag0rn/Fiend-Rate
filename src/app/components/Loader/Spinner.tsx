import { Oval } from 'react-loader-spinner';

const Spinner = () => {
  return (
    <Oval
      visible={true}
      height="80"
      width="80"
      color="#720101"
      secondaryColor='#720101'
      ariaLabel="oval-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
  )
}

export default Spinner;