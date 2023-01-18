import { useContext } from 'react';
import MobileContext from '../context/MobileProvider';

const useMobile = () => {
  return useContext(MobileContext);
};

export default useMobile;
