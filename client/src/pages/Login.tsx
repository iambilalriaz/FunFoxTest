import { KeyboardEvent, useEffect, useState } from 'react';
import { validate } from 'email-validator';
import { toast } from 'react-toastify';
import { userLogin } from '../api/requests';
import { AxiosResponse } from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { getAppUser } from '../utils';

import { motion } from 'framer-motion';
import { slideInVariants } from '../assets/variants';
import Input from '../components/common/Input';
import Spinner from '../components/common/Spinner';
import Button from '../components/common/Button';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (getAppUser()) {
      navigate('/dashboard');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const onUserLogin = () => {
    if (email?.trim() && validate(email) && password?.trim()) {
      setLoading(true);
      userLogin(email, password)
        .then((response: AxiosResponse) => {
          localStorage.setItem('appUser', JSON.stringify(response.data));
          setLoading(false);
          navigate(localStorage.getItem('redirect_route') || '/dashboard');
        })
        .catch(({ response }) => {
          setLoading(false);
          toast.error(response?.data?.message);
        });
    } else {
      toast.error('Please enter all required fields.');
    }
  };

  const onPressEnter = (e: KeyboardEvent) => {
    if (e?.key === 'Enter') {
      onUserLogin();
    }
  };
  return (
    <section className='h-screen bg-slate-300 grid place-items-center text-xs md:text-sm'>
      <motion.div
        variants={slideInVariants}
        initial='initial'
        animate='animate'
        transition={{
          delay: 0.2,
          duration: 0.5,
        }}
        className='bg-light shadow-2xl rounded-lg p-4 min-w-[50%] m-4 text-secondary'
      >
        <header className='text-2xl font-medium text-secondary underline'>
          Login
        </header>
        <Input
          label='Email'
          type='email'
          id='email'
          value={email}
          setValue={setEmail}
          onPressEnter={onPressEnter}
          containerStyles='mt-4'
        />
        <Input
          label='Password'
          type='password'
          id='password'
          value={password}
          setValue={setPassword}
          onPressEnter={onPressEnter}
          containerStyles='mt-4'
        />
        <p className='my-2 text-right'>
          New user?{' '}
          <Link to='/signup' className='underline text-primary font-medium'>
            Create account
          </Link>
        </p>
        {loading ? (
          <Spinner size='2xl' styles='mt-4' />
        ) : (
          <Button
            label='Login'
            clickHandler={onUserLogin}
            styles='m-auto mt-4'
          />
        )}
      </motion.div>
    </section>
  );
};

export default Login;
