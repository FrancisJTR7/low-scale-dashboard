import Image from 'next/image';

const Transactions = () => {
  return (
    <div className='bg-soft p-[20px] rounded-[10px]'>
      <h2 className='mb-[20px] font-[200] text-tsoft'>Latest Transactions</h2>
      <table className='w-full '>
        <thead>
          <tr>
            <td>Name</td>
            <td>Status</td>
            <td>Date</td>
            <td>Amount</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <Image
                src='/images.jpeg'
                alt='profile'
                width='40'
                height='40'
                className='rounded-[50%] object-cover'
              />
              John Doe
            </td>
            <td> pending </td>
            <td>02.14.2024</td>
            <td>$3,500</td>
          </tr>
          <tr>
            <td>
              <Image
                src='/images.jpeg'
                alt='profile'
                width='40'
                height='40'
                className='rounded-[50%] object-cover'
              />
              John Doe
            </td>
            <td> pending </td>
            <td>02.14.2024</td>
            <td>$3,500</td>
          </tr>
          <tr>
            <td>
              <Image
                src='/images.jpeg'
                alt='profile'
                width='40'
                height='40'
                className='rounded-[50%] object-cover'
              />
              John Doe
            </td>
            <td> pending </td>
            <td>02.14.2024</td>
            <td>$3,500</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Transactions;
