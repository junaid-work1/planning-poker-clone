import { useState } from 'react'
import { Outlet, Link } from 'react-router-dom'
import { auth } from 'firebaseConfig'
import { FaCanadianMapleLeaf } from 'react-icons/fa'
import { FiChevronDown } from 'react-icons/fi'
import { signOut } from 'firebase/auth'
import PropTypes from 'prop-types'

import Button from 'components/elements/Button'
import ContactModal from 'components/contactModal/ContactModal'
import Login from 'pages/auth/Login'
import SignUp from 'pages/auth/SignUp'

const Navbar = ({ activeUser, getDisplayName }) => {
  const [show, setShow] = useState(false)
  const [modalIsOpen, setIsOpen] = useState(false)
  const [loginmodalIsOpen, setLoginmodalIsOpen] = useState(false)
  const [signUpmodalIsOpen, setSignUpmodalIsOpen] = useState(false)

  const handleModal = () => setIsOpen(!modalIsOpen)
  const loginHandleModal = () => setLoginmodalIsOpen(!loginmodalIsOpen)
  const signUpHandleModal = () => setSignUpmodalIsOpen(!signUpmodalIsOpen)

  const logOut = () => {
    signOut(auth)
  }
  const handleContactModal = () => {
    setShow(!show)
    handleModal()
  }

  const handleLogOut = () => {
    setShow(!show)
    logOut()
  }

  const anchorList = [
    {
      style: 'text-gray-700 block px-4 py-2 text-sm cursor-pointer hover:bg-gray-200',
      functionCall: function () {
        setShow(!show)
      },
      title: 'My account'
    },
    {
      style: 'text-gray-700 block px-4 py-2 text-sm cursor-pointer hover:bg-gray-200',
      functionCall: function () {
        handleContactModal()
      },
      title: 'Contact us'
    },
    {
      style: 'text-gray-700 block px-4 py-2 text-sm cursor-pointer hover:bg-gray-200',
      functionCall: function () {
        handleLogOut()
      },
      title: 'Sign out'
    }
  ]

  const spanList = [
    {
      style: 'text-blue-500 hover:text-blue-400 hover:cursor-pointer',
      functionCall: function () {
        signUpHandleModal()
      },
      title: 'Sign Up'
    },
    {
      style: 'text-blue-500 hover:text-blue-400 hover:cursor-pointer',
      functionCall: function () {
        loginHandleModal()
      },
      title: 'Log in'
    }
  ]

  const logInUserDropDown = (
    <div className='origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'>
      <div className='py-1'>
        {anchorList.map((item, index) => (
          <a key={index.toString() + 1} className={item.style} onClick={item.functionCall}>
            {item.title}
          </a>
        ))}
      </div>
    </div>
  )

  const signUpOptions = (
    <div className='flex space-x-5 font-bold text-lg'>
      {spanList.map((item, index) => (
        <span key={index.toString() + 1} className={item.style} onClick={item.functionCall}>
          {item.title}
        </span>
      ))}
    </div>
  )

  const activeUserBtn = (
    <div className='relative inline-block text-left'>
      <div className='flex items-center space-x-2'>
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
      </div>
      {show && logInUserDropDown}
    </div>
  )

  return (
    <>
      <div className='navbar-main px-6 py-5 flex justify-between fixed bg-white w-full'>
        <div className='navbar-right flex items-center space-x-3'>
          <span className='text-4xl text-blue-500'>
            <FaCanadianMapleLeaf />
          </span>
          <div>
            <p className='font-bold text-blue-500 text-xl'>we agile you</p>
            <p className='text-gray-600 text-sm font-bold'>Planning Poker Online</p>
          </div>
        </div>
        <div className='navbar-right flex items-center space-x-7'>
          {activeUser ? activeUserBtn : signUpOptions}
          <Link to='/creategame'>
            <Button
              className='bg-blue-500 px-5 py-3 borde text-white font-bold rounded-md hover:bg-blue-400'
              title='Start New Game'
            />
          </Link>
        </div>
      </div>
      <ContactModal handleModal={handleModal} modalIsOpen={modalIsOpen} />
      <Login
        handleModal={loginHandleModal}
        modalIsOpen={loginmodalIsOpen}
        getDisplayName={getDisplayName}
      />
      <SignUp
        handleModal={signUpHandleModal}
        modalIsOpen={signUpmodalIsOpen}
        getDisplayName={getDisplayName}
      />
      <Outlet />
    </>
  )
}

Navbar.propTypes = {
  activeUser: PropTypes.string,
  getDisplayName: PropTypes.func
}

export default Navbar
