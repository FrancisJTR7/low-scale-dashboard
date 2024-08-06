import Link from 'next/link';

const Homepage = () => {
  return (
    <div>
      <Link href={'/login'}>login</Link>
    </div>
  );
};

export default Homepage;
