import AllRoutes from 'routes'
import { ToastContainer } from 'react-toastify'
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
