import { planningPostsArray } from 'constants/inputLists'

import Iphone from 'assets/images/iphone.webp'

const Planning = () => (
  <div className='planning-main w-full bg-gray-50 mb-20'>
    <div className='planning-title text-center space-y-6 pt-20'>
      <h1 className='text-4xl font-bold'>Stop boring plannings</h1>
      <p className='text-gray-600'>
        We give you the confidence that your team is connected and stays productive.
      </p>
    </div>
    {planningPostsArray.map(({ id, title, des, image }) => (
      <div
        className={`flex sm:flex-row flex-col justify-center items-center sm:mt-10 sm:p-10 px-8 ${
          id % 2 === 0 ? 'sm:flex-row-reverse' : ''
        }`}
        key={id}
      >
        <div className='planning-right sm:w-2/4 w-full flex flex-col px-10 py-16 sm:mt-5'>
          <div className='planning-content space-y-6 sm:mb-14'>
            <div className=' space-y-6'>
              <h1 className='text-4xl font-bold'>{title}</h1>
              <p className='text-gray-500'>{des}</p>
            </div>
          </div>
        </div>
        <div className='planning-left sm:w-2/4 w-96'>
          <img src={image} alt='Result' className='shadow-2xl rounded-lg' />
        </div>
      </div>
    ))}
    <div className='flex sm:flex-row-reverse flex-col justify-center items-center mt-10 p-10'>
      <div className='planning-right sm:w-2/4 flex flex-col px-10 sm:py-16 mt-5'>
        <div className='planning-content space-y-6 mb-14'>
          <div className=' space-y-6'>
            <h1 className='text-4xl font-bold'>Stay on Top of Estimates On-The-Go</h1>
            <p className='text-gray-500'>
              We’ve ensured the Planning Poker Online web app is compatible on all devices. Now, you
              and your agile development team can vote on any issue, anytime, anywhere.
            </p>
          </div>
        </div>
      </div>
      <div className='planning-left sm:w-1/3 w-full'>
        <img src={Iphone} alt='Iphone' />
      </div>
    </div>
  </div>
)

export default Planning
