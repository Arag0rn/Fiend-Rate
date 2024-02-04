import { Oval } from 'react-loader-spinner';

const Spinner = () => {
  return (
    <Oval
      visible={true}
      height="80"
      width="80"
      color="#FCFBF5"
      secondaryColor='#FCFBF5'
      ariaLabel="oval-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
  )
}

export default Spinner;