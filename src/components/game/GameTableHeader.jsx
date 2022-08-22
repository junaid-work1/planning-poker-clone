import { Link } from 'react-router-dom'

import { auth } from 'firebaseConfig'
import { FaCanadianMapleLeaf } from 'react-icons/fa'
import { FiChevronDown } from 'react-icons/fi'
import { IoPersonAddOutline } from 'react-icons/io5'
import { signOut } from 'firebase/auth'
import PropTypes from 'prop-types'

import Sidebar from 'components/sidebar/Sidebar'

const GameTableHeader = ({
  activeUser,
  handleCopyURL,
  show,
  setShow,
  currentPlayerId,
  players
}) => {
  const currentUser = () => {
    const [result] = players.filter(item => item.id === currentPlayerId)

    return result?.name
  }

  const logOut = () => {
    signOut(auth)
  }

  const HandleSignOut = () => {
    setShow(!show)
    logOut()
  }

  const loginUserDropDown = (
    <div className='origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'>
      <div className='py-1'>
        <a
          className='text-gray-700 block px-4 py-2 text-sm cursor-pointer hover:bg-gray-200'
          onClick={() => setShow(!show)}
        >
          My account
        </a>
        <a
          className='text-gray-700 block px-4 py-2 text-sm cursor-pointer hover:bg-gray-200'
          onClick={() => setShow(!show)}
        >
          Contact us
        </a>
        <a
          className='text-gray-700 block px-4 py-2 text-sm cursor-pointer hover:bg-gray-200'
          onClick={HandleSignOut}
        >
          Sign out
        </a>
      </div>
    </div>
  )

  return (
    <div className='px-6 py-5 flex justify-between bg-white w-full'>
      <div className='flex items-center space-x-3'>
        <span className='text-4xl text-blue-500'>
          <Link to='/'>
            <FaCanadianMapleLeaf />
          </Link>
        </span>
        <p className='font-bold text-xl'>Game name</p>
      </div>
      <div className='flex items-center'>
        {activeUser ? (
          <div className='relative inline-block text-left'>
            <button
              type='button'
              className='inline-flex justify-center w-full rounded-md shadow-sm px-4 py-2.5 text-md font-medium text-gray-700 hover:bg-gray-200 active:bg-gray-300 focus:outline-none focus:ring focus:ring-gray-300'
              onClick={() => setShow(!show)}
            >
              {activeUser}
              <span className='mt-1 ml-2 text-md'>
                <FiChevronDown />
              </span>
            </button>

            {show && loginUserDropDown}
          </div>
        ) : (
          <Link to='/'>
            <span className='border border-gray-200 px-6 py-3 rounded-lg shadow-lg'>
              {currentUser()}
            </span>
          </Link>
        )}
        <div className='flex'>
          <span
            className='flex mx-5 items-center px-5 py-2 borde text-blue-500 font-bold rounded-md border-2 border-blue-500 hover:bg-blue-100 cursor-pointer'
            onClick={handleCopyURL}
          >
            <span className='mr-3 text-lg'>
              <IoPersonAddOutline />
            </span>
            Invite Player
          </span>
          <Sidebar />
        </div>
      </div>
    </div>
  )
}

GameTableHeader.propTypes = {
  activeUser: PropTypes.string,
  handleCopyURL: PropTypes.func,
  show: PropTypes.bool,
  setShow: PropTypes.func,
  currentPlayerId: PropTypes.string,
  players: PropTypes.array
}

export default GameTableHeader
