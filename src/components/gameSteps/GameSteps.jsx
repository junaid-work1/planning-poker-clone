import shortid from 'shortid'

import Invite from 'assets/images/invite.svg'
import StartGame from 'assets/images/startGame.svg'
import Vote from 'assets/images/vote.svg'

const GameSteps = () => {
  const steps = [
    {
      title: 'Step 1. Initiate a New Game',
      subtitle: 'Start new game',
      des: ' with the option to add your issues right off the bat.',
      image: StartGame
    },
    {
      title: 'Step 2: Invite Your Agile Development Team',
      des: 'Send your new game URL to your people and let the game begin.',
      image: Invite
    },
    {
      title: 'Step 3: Vote!',
      des: 'Enjoy every aspect of our online scrum planning poker – and have fun while being productive!',
      image: Vote
    }
  ]

  return (
    <div className='game-steps-main mb-20'>
      <div className='game-steps-title text-center space-y-6 mb-10'>
        <h1 className='text-4xl font-bold'>Press Play on Planning Poker Online</h1>
        <p className='text-gray-600'>3 Simple Steps to Start Your Story Estimates</p>
      </div>
      <div className='game-steps-cards flex justify-center items-center space-x-16'>
        {steps.map(({ title, subtitle, des, image }) => (
          <div className='w-1/4 ml-12 space-y-10' key={shortid.generate()}>
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
}

export default GameSteps
