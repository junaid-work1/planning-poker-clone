import { gameStepsArray } from 'constants/inputLists'

const GameSteps = () => (
  <div className='game-steps-main mb-20'>
    <div className='game-steps-title text-center space-y-6 mb-10'>
      <h1 className='text-4xl font-bold'>Press Play on Planning Poker Online</h1>
      <p className='text-gray-600'>3 Simple Steps to Start Your Story Estimates</p>
    </div>
    <div className='game-steps-cards flex justify-center items-center space-x-16'>
      {gameStepsArray.map(({ title, subtitle, des, image }, index) => (
        <div className='w-1/4 ml-12 space-y-10' key={index.toString() + 1}>
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
