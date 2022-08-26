import { ulid } from 'ulid'
import { toast } from 'react-toastify'

import {
  addGameToStore,
  addPlayersToStore,
  getGameFromStore,
  getPlayersFromStore,
  updateGameDataInStore
} from '../services/firebase'
import { resetPlayers, updatePlayerOfGames } from './playerFunctions'
import { status } from 'constants/inputLists'

import 'react-toastify/dist/ReactToastify.css'

export const addNewGame = async game => {
  const gameId = ulid()

  const player = {
    id: ulid(),
    gameId,
    name: game.createdBy,
    status: status.NotStarted
  }
  const gameData = {
    ...game,
    id: gameId,
    createdById: player.id,
    average: 0,
    player: [player],
    gameStatus: status.Started
  }

  await addGameToStore(gameData.id, gameData)
  await addPlayersToStore(player.id, player)
  updatePlayerOfGames(gameData.id, player.id)

  return gameData.id
}

export const endOfGame = async gameId => {
  const game = await getGameFromStore(gameId)

  const players = await getPlayersFromStore(gameId)

  if (game && players) {
    const updatedGame = {
      average: getAverage(players),
      gameStatus: status.Finished
    }
    updateGame(gameId, updatedGame)
  }
}

export const getAverage = players => {
  let values = 0
  let numOfPlayers = 0
  players.forEach(player => {
    if (player.value && player.value >= 0) {
      values = values + player.value
      numOfPlayers++
    }
  })

  return Math.round(values / numOfPlayers)
}

export const updateGame = async (gameId, updatedGame) => {
  await updateGameDataInStore(gameId, updatedGame)
  return true
}

export const getGame = id => getGameFromStore(id)

export const resetGame = async gameId => {
  const game = await getGameFromStore(gameId)
  if (game) {
    const updatedGame = {
      average: 0,
      gameStatus: status.Started
    }
    updateGame(gameId, updatedGame)
    await resetPlayers(gameId)
  }
}

export const getGameStatus = players => {
  let numOfPlayers = 0
  players.forEach(player => {
    if (player.status === status.Finished) {
      numOfPlayers++
    }
  })
  if (numOfPlayers === 0) {
    return status.Started
  }
  return status.InProgress
}

export const updateGameStatus = async gameId => {
  const game = await getGame(gameId)
  if (!game) {
    toast.error('Game not found', { theme: 'colored' })
    return false
  }
  const players = await getPlayersFromStore(gameId)
  if (players) {
    const status = getGameStatus(players)
    const updateGameStatus = {
      gameStatus: status
    }
    const result = await updateGameDataInStore(gameId, updateGameStatus)
    return result
  }
  return false
}
