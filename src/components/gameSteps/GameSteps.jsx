import { gameStepsArray } from 'constants/inputLists'

const GameSteps = () => (
  <div className='game-steps-main sm:mb-20'>
    <div className='game-steps-title text-center space-y-6 mb-10'>
      <h1 className='text-4xl font-bold'>Press Play on Planning Poker Online</h1>
      <p className='text-gray-600'>3 Simple Steps to Start Your Story Estimates</p>
    </div>
    <div className='game-steps-cards flex sm:flex-row flex-col justify-center items-center sm:space-x-16 space-y-16'>
      {gameStepsArray.map(({ title, subtitle, des, image }, index) => (
        <div className='sm:w-1/4 w-72 ml-12 sm:space-y-10' key={index.toString() + 1}>
          <img src={image} alt='StartGame' />
          <h1 className='text-2xl font-bold'>{title}</h1>
          <p className='text-gray-600'>
            <span className='text-blue-500 font-bold hover:text-blue-300 hover:cursor-pointer'>
              {subtitle}
            </span>
            {des}
          </p>
        </div>
      ))}
    </div>
  </div>
)

export default GameSteps
