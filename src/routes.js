import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { auth } from 'firebaseConfig'

import CreateGame from 'pages/create-game/CreateGame'
import GameTable from 'pages/game-table/GameTable'
import Home from 'pages/home/Home'

const AllRoutes = () => {
  const [userName, setUserName] = useState('')

  const getDisplayName = () => {
    auth.onAuthStateChanged(user => {
      if (user) {
        setUserName(user.displayName)
      } else setUserName('')
    })
  }

  const route = [
    { path: '/', element: <Home activeUser={userName} getDisplayName={getDisplayName} /> },
    { path: 'creategame', element: <CreateGame /> },
    { path: 'gametable', element: <GameTable activeUser={userName} /> }
  ]

  useEffect(() => {
    getDisplayName()
  }, [auth])

  return (
    <BrowserRouter>
      <Routes>
        {route.map(item => (
          <Route path={item.path} element={item.element} key={item.path} />
        ))}
      </Routes>
    </BrowserRouter>
  )
}

export default AllRoutes
