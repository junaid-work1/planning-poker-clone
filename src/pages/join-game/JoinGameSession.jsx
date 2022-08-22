import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { FaCanadianMapleLeaf } from 'react-icons/fa'
import { toast } from 'react-toastify'
import PropTypes from 'prop-types'
import ReactLoading from 'react-loading'

import { addPlayerToGame, isCurrentPlayerInGame } from 'services/playerFunctions'
import { getGame } from 'services/gameFunctions'
import Button from 'components/elements/Button'
import Input from 'components/elements/Input'

const JoinGameSession = () => {
  let { id } = useParams()
  const Navigate = useNavigate()

  const [newSessionData, setNewSessionData] = useState({
    joinGameId: id,
    playerName: ''
  })
  const [error, setError] = useState(null)
  const [isloading, setIsloading] = useState(false)

  const gameSessionInputList = [
    {
      type: 'text',
      name: 'joinGameId',
      value: newSessionData.joinGameId,
      styling: 'border border-gray-300 p-3 w-full rounded-lg bg-gray-300 pointer-events-none',
      placeholder: 'Session Id',
      isDisabled: true
    },
    {
      type: 'text',
      name: 'playerName',
      value: newSessionData.playerName,
      styling: 'border border-gray-300 p-3 w-full rounded-lg',
      placeholder: 'Enter the loged in user',
      isDisabled: false
    }
  ]

  const handleChange = e => {
    const { name, value } = e.target
    setNewSessionData({ ...newSessionData, [name]: value })
    setError(null)
  }

  const handleSubmit = async () => {
    if (newSessionData.joinGameId && newSessionData.playerName) {
      setIsloading(true)
      const response = await addPlayerToGame(newSessionData.joinGameId, newSessionData.playerName)

      if (response) {
        setIsloading(false)
        Navigate(`/gametable/${newSessionData.joinGameId}`)
      } else {
        toast.error('Session not founded', { theme: 'colored' })
        setIsloading(false)
      }
    } else setError('input field should not be empty!')
  }

  useEffect(() => {
    async function fetchData() {
      if (newSessionData.joinGameId) {
        if (await getGame(newSessionData.joinGameId)) {
          if (isCurrentPlayerInGame(newSessionData.joinGameId)) {
            Navigate(`/gametable/${newSessionData.joinGameId}`)
          }
        }
      }
    }
    fetchData()
  }, [newSessionData.joinGameId, Navigate])

  return (
    <>
      <div className='flex items-center space-x-3 p-10'>
        <span className='text-4xl text-blue-500'>
          <Link to='/'>
            <FaCanadianMapleLeaf />
          </Link>
        </span>
        <p className='font-bold text-xl'>Join Game Session</p>
      </div>
      <div className='space-y-10 mt-28 flex flex-col justify-center items-center'>
        <div className='w-2/5 space-y-10 flex flex-col justify-center'>
          <div className='space-y-8'>
            {gameSessionInputList.map((item, index) => (
              <Input
                type={item.type}
                name={item.name}
                value={item.value}
                className={item.styling}
                placeholder={item.placeholder}
                onChange={handleChange}
                readOnly={item.isDisabled}
                key={index.toString() + 1}
              />
            ))}
          </div>
          <span className='text-red-500'>{error}</span>
          {!isloading ? (
            <Button
              className='w-full bg-blue-500 p-3 rounded-lg text-white font-bold'
              title='Join Now'
              onClick={handleSubmit}
            />
          ) : (
            <button className='w-full bg-gray-200 p-3 rounded-lg flex justify-center'>
              <ReactLoading type={'spin'} color={'gray'} height={30} width={30} />
            </button>
          )}
        </div>
      </div>
    </>
  )
}

JoinGameSession.propTypes = {
  activeUser: PropTypes.string
}

export default JoinGameSession
