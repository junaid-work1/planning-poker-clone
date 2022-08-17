import { Link } from 'react-router-dom'

import { heroPageImage } from 'constants/imgArray'
import Crew from 'assets/images/crew.svg'
import Result from 'assets/images/results.webp'

const HeroPage = () => (
  <div className='hero-page-main flex justify-evenly p-5 mb-20'>
    <div className='hero-page-right flex flex-col px-10 py-16 mt-20'>
      <div className='hero-page-content space-y-6 mb-14'>
        <div className='w-80 space-y-6'>
          <h1 className='text-4xl font-bold'>Scrum Poker for agile development teams</h1>
          <p className='text-gray-500'>
            Have fun while being productive with our simple and complete tool.
          </p>
        </div>
        <div className='flex flex-col space-y-16'>
          <Link to='/creategame'>
            <button className='w-fit bg-blue-500 px-5 py-3 borde text-white font-bold rounded-md hover:bg-blue-400'>
              Start New Game
            </button>
          </Link>
          <span className='text-gray-500'>TRUSTED BY TEAMS AT</span>
        </div>
      </div>
      <div className='hero-page-brands flex space-x-5'>
        {heroPageImage.map((item, index) => (
          <img src={item} alt='Microsoft' key={index.toString() + 1} />
        ))}
      </div>
    </div>
    <div className='hero-page-left mt-20'>
      <img src={Crew} alt='Crew' className='ml-16' />
      <img src={Result} alt='Result' className='shadow-2xl rounded-lg' width={600} />
    </div>
  </div>
)

export default HeroPage
