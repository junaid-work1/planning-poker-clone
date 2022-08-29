import { ToastContainer } from 'react-toastify'

import AllRoutes from 'routes'

const App = () => (
  <>
    <ToastContainer
      position='top-center'
      autoClose={2000}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss={false}
      draggable
      pauseOnHover={false}
    />
    <AllRoutes />
  </>
)

export default App
