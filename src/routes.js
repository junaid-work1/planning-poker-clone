import Home from 'pages/home/Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const AllRoutes = () => {
  const route = [{ path: '/', element: <Home /> }]
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
