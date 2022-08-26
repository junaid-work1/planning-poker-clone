import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaCanadianMapleLeaf } from 'react-icons/fa'
import PropTypes from 'prop-types'
import ReactLoading from 'react-loading'

import { addNewGame } from 'helperFunction/gameFunctions'
import Button from 'components/elements/Button'
import Input from 'components/elements/Input'

const CreateGame = ({ activeUser }) => {
  const navigate = useNavigate()

  const [gameName, setGameName] = useState('')
  const [isloading, setIsloading] = useState(false)
  const [error, setError] = useState(null)
  const [gameVoteSystem, setGameVoteSystem] = useState('Fibonacci')
  const [createdBy, setCreatedBy] = useState(activeUser || 'Guest')

  const handleChange = e => {
    setGameName(e.target.value)
    setError(null)
  }

  const handleSubmission = async () => {
    setCreatedBy(activeUser || 'Guest')

    if (gameName) {
      setIsloading(true)
      const game = {
        name: gameName,
        createdBy: createdBy,
        gameType: gameVoteSystem
      }
      const gameId = await addNewGame(game)
      setIsloading(false)
      navigate(`/gametable/${gameId}`)
    } else setError('input field should not be empty!')
  }

  const createGameBtn = (
    <Button
      className='w-full bg-blue-500 p-3 rounded-lg text-white font-bold'
      title='Create game'
      onClick={handleSubmission}
    />
  )

  const loadingSignBtn = (
    <button className='w-full bg-gray-200 p-3 rounded-lg flex justify-center'>
      <ReactLoading type={'spin'} color={'gray'} height={30} width={30} />
    </button>
  )

  return (
    <>
      <div className='flex items-center space-x-3 p-10'>
        <span className='text-4xl text-blue-500'>
          <Link to='/'>
            <FaCanadianMapleLeaf />
          </Link>
        </span>
        <p className='font-bold md:text-xl '>Create Game</p>
      </div>
      <div className='space-y-10 mt-28 flex flex-col justify-center items-center'>
        <p className='md:text-lg sm:text-sm text-xs'>
          Choose a name and a voting system for your game.
        </p>
        <div className='w-2/5 space-y-10 flex flex-col justify-center'>
          <div className='space-y-8'>
            <Input
              type='text'
              name='name'
              value={gameName}
              className='min-w-full sm:min-w-full border border-gray-300 p-2 rounded-lg'
              placeholder='Game name'
              onChange={handleChange}
            />
            <select
              className='w-full p-3 border border-gray-300 bg-gray-300 text-sm rounded-lg cursor-pointer'
              value={gameVoteSystem}
              onChange={e => setGameVoteSystem(e.target.value)}
              disabled
            >
              <option value='Fibonacci'>
                Fibonacci ( 0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, ? )
              </option>
            </select>
          </div>
          <span className='text-red-500'>{error}</span>
          {!isloading ? createGameBtn : loadingSignBtn}
        </div>
      </div>
    </>
  )
}

CreateGame.propTypes = {
  activeUser: PropTypes.string
}

export default CreateGame
