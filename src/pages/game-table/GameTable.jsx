import { useState } from 'react'
import { Link } from 'react-router-dom'

import { auth } from 'firebaseConfig'
import { FaCanadianMapleLeaf } from 'react-icons/fa'
import { FiChevronDown } from 'react-icons/fi'
import { IoPersonAddOutline } from 'react-icons/io5'
import { signOut } from 'firebase/auth'
import PropTypes from 'prop-types'

import Sidebar from 'components/sidebar/Sidebar'

const GameTable = ({ activeUser }) => {
  const [show, setShow] = useState(false)
  const [selectCard, setSelectCard] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const [revealCard, setRevealCard] = useState(false)
  const [startVoting, setStartVoting] = useState(false)
  const [value, setValue] = useState(null)

  const loginMessage = 'You need to login!'

  const divArray = [
    { label: '1', value: 0 },
    { label: '2', value: 1 },
    { label: '3', value: 2 },
    { label: '4', value: 3 },
    { label: '5', value: 5 },
    { label: '6', value: 8 },
    { label: '7', value: 13 },
    { label: '8', value: 21 },
    { label: '9', value: 34 },
    { label: '10', value: 55 },
    { label: '11', value: 89 },
    { label: '12', value: '?' }
  ]

  const logOut = () => {
    signOut(auth)
  }

  const handleItemSelected = item => {
    if (item?.value === selectedItem?.value) {
      setValue(null)
      setSelectedItem(null)
      setSelectCard(!selectCard)
    } else {
      setSelectedItem(item)
      setSelectCard(!selectCard)
      setValue(item.value)
    }
  }

  const handleRevealCard = () => {
    setRevealCard(!revealCard)
    setStartVoting(!startVoting)
    setSelectedItem(null)
  }
  const handleStartVoting = () => {
    setRevealCard(!revealCard)
    setSelectCard(!selectCard)
    setStartVoting(!startVoting)
    setValue(null)
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
          onClick={() => {
            setShow(!show)
          }}
        >
          Contact us
        </a>
        <a
          className='text-gray-700 block px-4 py-2 text-sm cursor-pointer hover:bg-gray-200'
          onClick={() => {
            setShow(!show)
            logOut()
          }}
        >
          Sign out
        </a>
      </div>
    </div>
  )
  const revealButton = (
    <button
      className='w-fit px-4 py-2 rounded-lg font-bold bg-blue-500 text-white hover:bg-blue-400'
      hidden={revealCard}
      onClick={handleRevealCard}
    >
      Reveal Card
    </button>
  )
  return (
    <>
      <div>
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
                <div>
                  <button
                    type='button'
                    className='inline-flex justify-center w-full rounded-md shadow-sm px-4 py-2.5 text-md font-medium text-gray-700 hover:bg-gray-200 active:bg-gray-300 focus:outline-none focus:ring focus:ring-gray-300 '
                    onClick={() => setShow(!show)}
                  >
                    {activeUser}
                    <span className='mt-1 ml-2 text-md'>
                      <FiChevronDown />
                    </span>
                  </button>
                </div>

                {show && loginUserDropDown}
              </div>
            ) : (
              <Link to='/'>
                <span className='text-red-500 underline'> {loginMessage}</span>
              </Link>
            )}
            <div className='flex'>
              <button className='flex mx-5 items-center px-5 py-2 borde text-blue-500 font-bold rounded-md border-2 border-blue-500 hover:bg-blue-100'>
                <span className='mr-3 text-lg'>
                  <IoPersonAddOutline />
                </span>
                Invite Player
              </button>
              <Sidebar />
            </div>
          </div>
        </div>
      </div>
      <div className='game-table-main flex flex-col items-center justify-center space-y-6 mt-36'>
        <div className='flex flex-col space-y-1'>
          <span className='text-lg'>Feeling lonely? 😴</span>
          <span className='text-blue-500 ml-3 font-bold hover:text-blue-400 cursor-pointer'>
            Invite players
          </span>
        </div>
        <div className='w-1/4 h-40 rounded-2xl flex flex-col justify-center items-center bg-blue-100'>
          {!selectCard ? (
            <span className='text-gray-500 text-lg'>pick your cards!</span>
          ) : (
            revealButton
          )}
          {revealCard && (
            <button
              className='w-fit px-4 py-2 rounded-lg font-bold bg-gray-500 text-white hover:bg-gray-900'
              onClick={handleStartVoting}
            >
              Start new voting
            </button>
          )}
        </div>
        <div className='flex space-x-10'>
          {!startVoting ? (
            <div>
              <div
                className={`w-10 h-20 ${
                  selectCard ? 'bg-blue-500' : 'bg-gray-300'
                }  rounded-lg mb-2`}
              ></div>
              {activeUser ? (
                <span className='font-bold mt-2'>{activeUser} </span>
              ) : (
                <Link to='/'>
                  <span className='text-red-500 underline'>{loginMessage} </span>
                </Link>
              )}
            </div>
          ) : (
            <div>
              <div className='w-10 h-20 flex justify-center items-center font-bold text-lg border-2 border-blue-500 rounded-lg mb-2'>
                {value}
              </div>
              <span className='font-bold mt-2'>{activeUser}</span>
            </div>
          )}
        </div>
        {!revealCard ? (
          <div className='choose-card-box space-y-2'>
            <p className='text-center'> Choose your card 👇</p>
            <div className='flex space-x-5'>
              {divArray.map(item => {
                return (
                  <div key={item.value}>
                    <button
                      className={`w-10 h-20 ${
                        value !== null
                          ? selectedItem?.value === item?.value
                            ? 'bg-blue-500 text-white -mt-2'
                            : 'text-white bg-gray-400 cursor-not-allowed border-none'
                          : 'text-blue-500'
                      } border-2 border-blue-500 rounded-lg mt-4 font-bold text-lg flex items-center justify-center cursor-pointer`}
                      onClick={() => handleItemSelected(item)}
                      disabled={
                        value !== null
                          ? selectedItem?.value === item?.value
                            ? false
                            : true
                          : false
                      }
                    >
                      {item.value}
                    </button>
                  </div>
                )
              })}
            </div>
          </div>
        ) : (
          <div className='result-box flex justify-center items-center space-x-16'>
            <div className='flex space-x-3'>
              <div className='mb-10 flex flex-col justify-center items-center'>
                <div className='w-2 h-20 bg-gray-900 rounded-lg'></div>
                <div className='w-10 h-20 border-2 border-blue-500 rounded-lg mt-4 mb-3 text-blue-500 font-bold text-lg flex items-center justify-center'>
                  {value}
                </div>
                1 vote
              </div>
            </div>
            <div>
              <span className='text-gray-400 text-2xl'>Average: 8</span>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

GameTable.propTypes = {
  activeUser: PropTypes.string
}

export default GameTable
