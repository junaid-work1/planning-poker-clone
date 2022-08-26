import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { auth } from 'firebaseConfig'

import CreateGame from 'pages/create-game/CreateGame'
import GameTable from 'pages/game-table/GameTable'
import Home from 'pages/home/Home'
import JoinGameSession from 'pages/join-game/JoinGameSession'

const AllRoutes = () => {
  const [userName, setUserName] = useState('')
  const [userEmail, setUserEmail] = useState('')

  const getDisplayName = () => {
    auth.onAuthStateChanged(user => {
      if (user) {
        setUserName(user.displayName)
        setUserEmail(user.email)
      } else {
        setUserName('')
        setUserEmail('')
      }
    })
  }

  const route = [
    {
      path: '/*',
      element: <Home activeUser={userName} getDisplayName={getDisplayName} userEmail={userEmail} />
    },
    { path: 'creategame', element: <CreateGame activeUser={userName} /> },
    { path: '/joingamesession/:id', element: <JoinGameSession activeUser={userName} /> },
    { path: 'gametable/:id', element: <GameTable activeUser={userName} /> }
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
