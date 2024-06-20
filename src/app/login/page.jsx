import { login } from './actions';

export default function LoginPage() {
  return (
    <form>
      <label htmlFor='email' className='text-black'>
        Email:
      </label>
      <input
        id='email'
        name='email'
        type='email'
        required
        className='text-black'
      />
      <label htmlFor='password' className='text-black'>
        Password:
      </label>
      <input
        id='password'
        name='password'
        type='password'
        required
        className='text-black'
      />
      <button formAction={login}>Log in</button>
    </form>
  );
}
