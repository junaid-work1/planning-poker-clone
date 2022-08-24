const activePlayerStore = 'activePlayer'

export const getPlayerGamesFromCache = () => {
  let playerGames = []

  const store = localStorage.getItem(activePlayerStore)
  if (store) {
    playerGames = JSON.parse(store)
  }
  return playerGames
}

export const updatePlayerGamesInCache = playerGames =>
  localStorage.setItem(activePlayerStore, JSON.stringify(playerGames))

export const isGameInPlayerCache = gameId => {
  const playerGames = getPlayerGamesFromCache()
  const found = playerGames.find(playerGames => playerGames.gameId === gameId)
  if (found) {
    return true
  }
  return found ? true : false
}
