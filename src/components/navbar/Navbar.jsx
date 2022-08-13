import { useState } from 'react'

import { FaCanadianMapleLeaf } from 'react-icons/fa'
import { FiChevronDown } from 'react-icons/fi'

import ContactModal from 'components/contactModal/ContactModal'

const Navbar = () => {
  const [show, setShow] = useState(false)
  const [modalIsOpen, setIsOpen] = useState(false)

  const handleModal = () => setIsOpen(!modalIsOpen)
  return (
    <>
      <div className='navbar-main px-6 py-5 flex justify-between fixed bg-white w-full '>
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
          {false && (
            <div className='relative inline-block text-left'>
              <div>
                <button
                  type='button'
                  className='inline-flex justify-center w-full rounded-md shadow-sm px-4 py-2.5 text-md font-medium text-gray-700 hover:bg-gray-200 active:bg-gray-300 focus:outline-none focus:ring focus:ring-gray-300 '
                  onClick={() => setShow(!show)}
                >
                  Junaid
                  <span className='mt-1 ml-2 text-md'>
                    <FiChevronDown />
                  </span>
                </button>
              </div>
              {show && (
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
                      onClick={() => {
                        setShow(!show)
                        handleModal()
                      }}
                    >
                      Contact us
                    </a>
                    <a
                      className='text-gray-700 block px-4 py-2 text-sm cursor-pointer hover:bg-gray-200'
                      onClick={() => setShow(!show)}
                    >
                      Sign out
                    </a>
                  </div>
                </div>
              )}
            </div>
          )}
          <div className='flex space-x-5 font-bold text-lg'>
            <span className='text-blue-500 hover:text-blue-400 hover:cursor-pointer'>Sign Up</span>
            <span className='text-blue-500 hover:text-blue-400 hover:cursor-pointer'>Login</span>
          </div>
          <button className='bg-blue-500 px-5 py-3 borde text-white font-bold rounded-md hover:bg-blue-400'>
            Start New Game
          </button>
        </div>
      </div>
      <ContactModal handleModal={handleModal} modalIsOpen={modalIsOpen} />
    </>
  )
}
export default Navbar
