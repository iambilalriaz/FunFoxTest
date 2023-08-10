import { motion } from 'framer-motion';
import { getAppUser } from '../utils';
import { slideInVariants } from '../assets/variants';

const UserInfo = () => {
  return (
    <motion.p
      variants={slideInVariants}
      className='fixed w-full top-12 pt-8 pb-4 text-center text-xs sm:text-base bg-light text-light flex justify-center items-center'
    >
      <p className='bg-secondary w-fit rounded-full px-2 sm:px-4 py-1'>
        {getAppUser()?.email}
      </p>
      <p className='bg-primary w-fit rounded-full px-2 sm:px-4 py-1 ml-1 sm:ml-3'>
        {getAppUser()?.group}
      </p>
    </motion.p>
  );
};

export default UserInfo;
