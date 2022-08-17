import { Link } from 'react-router-dom'

import { FaCanadianMapleLeaf } from 'react-icons/fa'

const CreateGame = () => {
  return (
    <>
      <div className='flex items-center space-x-3 p-10'>
        <span className='text-4xl text-blue-500'>
          <Link to='/'>
            <FaCanadianMapleLeaf />
          </Link>
        </span>
        <div>
          <p className='font-bold text-xl'>Create Game</p>
        </div>
      </div>
      <div className='space-y-10 mt-28 flex flex-col justify-center items-center'>
        <p>Choose a name and a voting system for your game.</p>
        <div className='w-2/5 space-y-16 flex flex-col justify-center'>
          <div className='space-y-8'>
            <input
              type='text'
              name='game'
              className='border border-gray-300 p-2 w-full rounded-lg'
              placeholder='Game name'
            />
            <select className='w-full p-3 border border-gray-300 text-sm rounded-lg cursor-pointer'>
              <option value='US'>Fibonacci ( 0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, ? )</option>
              <option value='CA'>Powers of 2 ( 0, 1, 2, 4, 8, 16, 32, 64, ? )</option>
            </select>
          </div>
          <Link to='/gametable'>
            <button className='w-full bg-blue-500 p-3 rounded-lg text-white font-bold'>
              Create game
            </button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default CreateGame
