import { ulid } from 'ulid'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import {
  addPlayersToStore,
  getGameFromStore,
  getPlayerFromStore,
  getPlayersFromStore,
  updatePlayerInGameInStore,
  updatePlayerInStore
} from '../services/firebase'
import { updateGameStatus } from './gameFunctions'
import {
  getPlayerGamesFromCache,
  isGameInPlayerCache,
  updatePlayerGamesInCache
} from './localStorage'
import { status } from 'constants/inputLists'

export const updatePlayerOfGames = (gameId, playerId) => {
  let playerGames = getPlayerGamesFromCache()

  playerGames.push({ gameId, playerId })
  updatePlayerGamesInCache(playerGames)
}

export const getCurrentPlayerId = gameId => {
  let playerGames = getPlayerGamesFromCache()

  const game = playerGames.find(playerGame => playerGame.gameId === gameId)

  return game && game.playerId
}

export const updatePlayerValue = async (gameId, playerId, value) => {
  const player = await getPlayerFromStore(gameId, playerId)

  if (player) {
    const updatedPlayer = {
      ...player,
      value: value,
      status: status.Finished
    }
    await updatePlayerInStore(gameId, updatedPlayer)
    await updateGameStatus(gameId)
    return true
  }

  return false
}

export const isCurrentPlayerInGame = gameId => isGameInPlayerCache(gameId)

export const addPlayerToGame = async (gameId, playerName) => {
  const joiningGame = await getGameFromStore(gameId)

  if (!joiningGame) {
    toast.error('Game not founded!', { theme: 'colored' })
    return false
  }
  const newPlayer = { name: playerName, id: ulid(), gameId, status: status.NotStarted }

  updatePlayerOfGames(gameId, newPlayer.id)
  await addPlayersToStore(newPlayer.id, newPlayer)
  await updatePlayerInGameInStore(gameId, newPlayer)

  return true
}

export const resetPlayers = async gameId => {
  const players = await getPlayersFromStore(gameId)

  players.forEach(async player => {
    const updatedPlayer = {
      ...player,
      value: 0,
      status: status.NotStarted
    }
    await updatePlayerInStore(gameId, updatedPlayer)
  })
}
