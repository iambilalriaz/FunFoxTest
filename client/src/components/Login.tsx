import { useState } from 'react';
import Button from './common/Button';
import { validate } from 'email-validator';
import { toast } from 'react-toastify';
import { userLogin } from '../api/requests';
import { AxiosResponse } from 'axios';
import { Link, useNavigate } from 'react-router-dom';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const onUserLogin = () => {
    if (email?.trim() && validate(email) && password?.trim()) {
      userLogin(email, password).then((response: AxiosResponse) => {
        localStorage.setItem('appUser', JSON.stringify(response.data));
        navigate('/dashboard');
      });
    } else {
      toast.error('Please enter all required fields.');
    }
  };
  return (
    <section className='h-screen bg-slate-300 grid place-items-center text-xs md:text-sm'>
      <div className='bg-light shadow-2xl rounded-lg p-4 min-w-[50%] m-4 text-secondary'>
        <header className='text-2xl font-medium text-secondary underline'>
          Login
        </header>
        <div className='mt-4'>
          <label htmlFor='email' className='font-medium'>
            Email
          </label>
          <input
            className='outline-none border border-secondary rounded p-2 block w-full mt-1'
            type='email'
            id='email'
            required
            value={email}
            onChange={(e) => setEmail(e?.target?.value)}
          />
        </div>
        <div className='mt-4'>
          <label htmlFor='password' className='font-medium'>
            Password
          </label>
          <input
            className='outline-none border border-secondary rounded p-2 block w-full mt-1'
            type='password'
            id='password'
            required
            value={password}
            onChange={(e) => setPassword(e?.target?.value)}
          />
        </div>
        <p className='my-2 text-right'>
          New user?{' '}
          <Link to='/signup' className='underline text-primary font-medium'>
            Create account
          </Link>
        </p>
        <Button label='Login' clickHandler={onUserLogin} styles='m-auto mt-4' />
      </div>
    </section>
  );
};

export default Login;
