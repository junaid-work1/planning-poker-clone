import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { onSnapshot } from 'firebase/firestore'
import { toast } from 'react-toastify'
import PropTypes from 'prop-types'

import { Fibonacci } from 'constants/inputLists'
import { endOfGame, resetGame } from 'services/gameFunctions'
import { getCurrentPlayerId, updatePlayerValue } from 'services/playerFunctions'
import { getAllPlayersFromStore, getCompleteGameData } from 'services/firebase'
import Button from 'components/elements/Button'
import GameTableHeader from 'components/game/GameTableHeader'

import 'react-toastify/dist/ReactToastify.css'

const GameTable = ({ activeUser }) => {
  const navigate = useNavigate()
  let { id } = useParams()

  const [currentPlayerId, setCurrentPlayerId] = useState(undefined)
  const [game, setGame] = useState(undefined)
  const [players, setPlayers] = useState([])
  const [show, setShow] = useState(false)

  const handleFinishGame = () => {
    endOfGame(id)
  }

  const handleRestGame = () => {
    resetGame(id)
  }

  const handleCopyURL = () => {
    const url = window.location.href
    const pathname = new URL(url).pathname
    let [, , pathId] = pathname.split('/')
    const requireURL = `http://localhost:3000/joingamesession/${pathId}`

    navigator.clipboard.writeText(requireURL)
    toast.info('Invitation link copied!', { theme: 'colored' })
  }

  const playPlayer = (gameId, playerId, card) => {
    updatePlayerValue(gameId, playerId, card.value)
  }

  useEffect(() => {
    async function fetchData() {
      onSnapshot(getCompleteGameData(id), querySnapshot => {
        querySnapshot.forEach(doc => {
          setGame(doc.data())
        })
      })

      onSnapshot(getAllPlayersFromStore(id), querySnapshot => {
        const activePlayers = []
        querySnapshot.forEach(doc => {
          activePlayers.push(doc.data())
        })
        setPlayers(activePlayers)
      })

      const currentPlayerId = getCurrentPlayerId(id)
      if (!currentPlayerId) {
        navigate(`/joingamesession/${id}`)
      }
      setCurrentPlayerId(currentPlayerId)
    }

    fetchData(id)
  }, [id, navigate])

  return (
    <>
      <GameTableHeader
        activeUser={activeUser}
        handleCopyURL={handleCopyURL}
        show={show}
        setShow={setShow}
        players={players}
        currentPlayerId={currentPlayerId}
      />
      <div className='game-table-main flex flex-col items-center justify-center space-y-6 mt-36'>
        {players.length < 1 && (
          <div className='flex flex-col space-y-1'>
            <span className='text-lg'>Feeling lonely? 😴</span>
            <span
              className='text-blue-500 ml-3 font-bold hover:text-blue-400 cursor-pointer'
              onClick={handleCopyURL}
            >
              Invite players
            </span>
          </div>
        )}
        <div className='w-1/4 h-40 rounded-2xl flex flex-col space-y-10 justify-center items-center bg-blue-100'>
          {game?.gameStatus === 'Started' && (
            <p className='font-bold text-gray-400 underline text-lg'>Pick a card!</p>
          )}
          <div className='flex space-x-6'>
            {game?.gameStatus === 'In Progress' && (
              <Button
                className='w-fit px-4 py-2 rounded-lg font-bold bg-blue-500 text-white hover:bg-blue-400'
                onClick={handleFinishGame}
                title='Reveal Card'
              />
            )}
            {game?.gameStatus === 'Finished' && (
              <Button
                className='w-fit px-4 py-2 rounded-lg font-bold bg-gray-500 text-white hover:bg-gray-900'
                onClick={handleRestGame}
                title='Start new voting'
              />
            )}
          </div>
        </div>
        <div className='flex space-x-10'>
          {game?.average <= 0 ? (
            <div className='flex space-x-10'>
              {players?.map(item => (
                <div key={item.id}>
                  <div
                    className={`w-10 h-20 ${
                      item?.status === 'Finished' ? 'bg-blue-500' : 'bg-gray-300'
                    }  rounded-lg mb-2`}
                  ></div>
                  <span className='font-bold mt-2'>{item?.name} </span>
                </div>
              ))}
            </div>
          ) : (
            <div className='flex space-x-5'>
              {players?.map(item => (
                <div key={item.id}>
                  <div className='w-10 h-20 flex justify-center items-center font-bold text-lg border-2 border-blue-500 rounded-lg mb-2'>
                    {item.value}
                  </div>
                  <span className='font-bold mt-2'>{item.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        {game?.average <= 0 ? (
          <div className='choose-card-box space-y-2'>
            <p className='text-center'> Choose your card 👇</p>
            <div className='flex space-x-5'>
              {Fibonacci?.map(card => (
                <div key={card.value}>
                  <button
                    className={`w-10 h-20 border-2 text-blue-500 border-blue-500 rounded-lg mt-4 font-bold text-lg flex items-center justify-center cursor-pointer hover:bg-blue-500 hover:text-white`}
                    onClick={() => playPlayer(game.id, currentPlayerId, card)}
                  >
                    {card.label}
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className='result-box flex justify-center items-center space-x-16'>
            <span className='text-gray-400 text-2xl'>Average: {game?.average}</span>
          </div>
        )}
      </div>
    </>
  )
}

GameTable.propTypes = {
  activeUser: PropTypes.string
}

export default GameTable
