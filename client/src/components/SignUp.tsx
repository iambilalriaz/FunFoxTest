import { KeyboardEvent, useEffect, useState } from 'react';
import { userGroups } from '../assets/groups';
import Button from './common/Button';
import { validate } from 'email-validator';
import { toast } from 'react-toastify';
import { userSignUp } from '../api/requests';
import { AxiosResponse } from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { getAppUser } from '../utils';
const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [group, setGroup] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (getAppUser()) {
      navigate('/dashboard');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const onUserSignUp = () => {
    if (email?.trim() && validate(email) && password?.trim() && group) {
      userSignUp(email, password, group).then((response: AxiosResponse) => {
        toast.success(response.data.message);
        navigate('/login');
      });
    } else {
      toast.error('Please enter all required fields.');
    }
  };

  const onPressEnter = (e: KeyboardEvent) => {
    if (e?.key === 'Enter') {
      onUserSignUp();
    }
  };
  return (
    <section className='h-screen bg-slate-300 grid place-items-center text-xs md:text-sm'>
      <div className='bg-light shadow-2xl rounded-lg p-4 min-w-[50%] m-4 text-secondary'>
        <header className='text-2xl font-medium text-secondary underline'>
          Sign Up
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
            onKeyDown={onPressEnter}
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
            onKeyDown={onPressEnter}
          />
        </div>
        <div className='mt-4'>
          <label htmlFor='user-group' className='font-medium'>
            Group
          </label>
          <select
            className='outline-none border border-secondary rounded p-2 block w-full mt-1'
            id='password'
            required
            value={group}
            onChange={(e) => setGroup(e?.target?.value)}
            onKeyDown={onPressEnter}
          >
            <option disabled value=''>
              -- Select user group --
            </option>
            {userGroups?.map((userGroup) => (
              <option value={userGroup} key={userGroup}>
                {userGroup}
              </option>
            ))}
          </select>
        </div>
        <p className='my-2 text-right'>
          Already user?{' '}
          <Link to='/login' className='underline text-primary font-medium'>
            Login instead
          </Link>
        </p>
        <Button
          label='Signup'
          clickHandler={onUserSignUp}
          styles='m-auto mt-4'
        />
      </div>
    </section>
  );
};

export default SignUp;
