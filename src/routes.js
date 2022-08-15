import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { auth } from 'firebaseConfig'

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
    { path: '/', element: <Home activeUser={userName} getDisplayName={getDisplayName} /> }
  ]

  useEffect(() => {
    getDisplayName()
  }, [auth])

  return (
    <div>
      <BrowserRouter>
        <Routes>
          {route.map(item => (
            <Route path={item.path} element={item.element} key={item.path} />
          ))}
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default AllRoutes
