'use client';

import React, { useState } from 'react';

import { login } from '../actions';
import { cn } from '@src/lib/utils';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import Link from 'next/link';
import Image from 'next/image';

const LogInBox = ({ className, ...props }) => {
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.target);

    try {
      await login(formData);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className='lg:px-8 bg-white w-[20%] flex justify-center'>
      <div className='h-[100vh]  min-w-[100%] flex  flex-col justify-center space-y-6 sm:w-[350px]'>
        <Image
          src='/orcaLogo.png'
          alt='profile'
          width='250'
          height='80'
          className='absolute top-16 left-4'
        />
        <div className='flex flex-col pb-48  '>
          <h1 className='text-[32px] font-semibold tracking-tight text-left text-black'>
            Welcome Back
          </h1>
          <p className='text-[24px] text-muted-foreground text-left text-gray-400'>
            Log in to your account
          </p>
        </div>
        <Button
          variant='outline'
          type='button'
          disabled={isLoading}
          className='text-black border-gray-400 rounded-[4px]'
        >
          {/* {isLoading ? (
              <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />
            ) : (
              <Icons.gitHub className='mr-2 h-4 w-4' />
            )} */}
          (G) Sign in with Google
        </Button>
        <div className='relative'>
          <div className='absolute inset-0 flex items-center'>
            <span className='w-full border-t' />
          </div>
          <div className='relative flex justify-center text-xs uppercase'></div>
        </div>
        <div className={cn('grid gap-6', className)} {...props}>
          <form onSubmit={onSubmit}>
            <div className='grid gap-2'>
              <div className='grid gap-1'>
                <Label className='sr-only' htmlFor='email'>
                  Email
                </Label>
                <Input
                  id='email'
                  placeholder='name@example.com'
                  type='email'
                  name='email'
                  autoCapitalize='none'
                  autoComplete='email'
                  autoCorrect='off'
                  disabled={isLoading}
                  className='border-gray-300 focus:text-gray-700 text-gray-300 rounded-[4px]'
                />
              </div>
              <div className='grid gap-1'>
                <Label className='sr-only' htmlFor='password'>
                  Password
                </Label>
                <Input
                  id='password'
                  placeholder='password'
                  type='password'
                  name='password'
                  autoCapitalize='none'
                  autoComplete='password'
                  autoCorrect='off'
                  disabled={isLoading}
                  className='border-gray-300 focus:text-gray-700 text-gray-300 rounded-[4px]'
                />
              </div>
              <Button
                type='submit'
                disabled={isLoading}
                className='bg-[#8BDBBE] rounded-[4px]'
              >
                {/* {isLoading && (
                  <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />
                )} */}
                Sign In
              </Button>
            </div>
          </form>
        </div>
        <p className='px-8 text-center text-sm text-black'>
          By clicking continue, you agree to our{' '}
          <Link
            href='/terms'
            className='underline underline-offset-4 hover:text-primary'
          >
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link
            href='/privacy'
            className='underline underline-offset-4 hover:text-primary'
          >
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default LogInBox;
