import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { auth } from 'firebaseConfig'

import CreateGame from 'pages/create-game/CreateGame'
import GameTable from 'pages/game-table/GameTable'
import Home from 'pages/home/Home'
import JoinGameSession from 'pages/join-game/JoinGameSession'

const AllRoutes = () => {
  const [userData, setUserData] = useState({ userName: '', userEmail: '' })

  const getDisplayName = () => {
    auth.onAuthStateChanged(user => {
      if (user) {
        setUserData({ userName: user.displayName, userEmail: user.email })
      } else setUserData({ userName: '', userEmail: '' })
    })
  }

  const routes = [
    {
      path: '/*',
      element: (
        <Home
          activeUser={userData.userName}
          getDisplayName={getDisplayName}
          userEmail={userData.userEmail}
        />
      )
    },
    { path: 'creategame', element: <CreateGame activeUser={userData.userName} /> },
    { path: '/joingamesession/:id', element: <JoinGameSession activeUser={userData.userName} /> },
    { path: 'gametable/:id', element: <GameTable activeUser={userData.userName} /> }
  ]

  useEffect(() => {
    getDisplayName()
  }, [auth])

  return (
    <BrowserRouter>
      <Routes>
        {routes.map(item => (
          <Route path={item.path} element={item.element} key={item.path} />
        ))}
      </Routes>
    </BrowserRouter>
  )
}

export default AllRoutes
