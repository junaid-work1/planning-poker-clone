import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { auth } from 'firebaseConfig'
import { signInWithEmailAndPassword } from 'firebase/auth'
import Modal from 'react-modal'
import PropTypes from 'prop-types'

import { customStyles } from 'constants/customStyle'
import Input from 'components/elements/Input'
import SignUp from './SignUp'

const Login = ({ handleModal, modalIsOpen, getDisplayName }) => {
  const [userData, setUserData] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false)
  const [signUpmodalIsOpen, setSignUpmodalIsOpen] = useState(false)

  const navigate = useNavigate()

  const inputList = [
    { name: 'email', type: 'email', placeholder: 'Email', value: userData.email },
    { name: 'password', type: 'password', placeholder: 'Password', value: userData.password }
  ]

  const signUpHandleModal = () => setSignUpmodalIsOpen(!signUpmodalIsOpen)

  const handleChange = event => {
    const { name, value } = event.target
    setUserData({
      ...userData,
      [name]: value.trim()
    })
  }

  const handleSubmission = () => {
    if (!userData.email || !userData.password) {
      setError('Error! filed should not be empty')
      return
    }
    setError('')
    setSubmitButtonDisabled(true)

    signInWithEmailAndPassword(auth, userData.email, userData.password)
      .then(() => {
        setSubmitButtonDisabled(false)
        handleModal()
        setUserData({ email: '', password: '' })
        navigate('/')
        getDisplayName()
      })
      .catch(error => {
        setSubmitButtonDisabled(false)
        setError(error.message)
      })
  }

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        ariaHideApp={false}
        onRequestClose={handleModal}
        style={customStyles}
      >
        <div className='mx-auto p-10 relative'>
          <span className='font-bold text-lg'>Sign in</span>
          <div
            className='absolute right-0 -top-2 text-gray-600 text-xl hover:bg-gray-200 px-3 py-2 rounded-2xl font-bold cursor-pointer'
            onClick={() => {
              handleModal()
              setError('')
            }}
          >
            X
          </div>
          <div className='mb-10 mt-6 space-y-7'>
            {inputList.map(item => {
              return (
                <Input
                  name={item.name}
                  type={item.type}
                  placeholder={item.placeholder}
                  defaultValue={item.value}
                  onChange={handleChange}
                  key={item.name}
                />
              )
            })}
          </div>
          <button
            className={`h-10 w-full px-5 mb-5 text-white font-bold ${
              submitButtonDisabled ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-300'
            }  rounded-lg transition-colors duration-150 focus:shadow-outline`}
            disabled={submitButtonDisabled}
            onClick={handleSubmission}
          >
            Login
          </button>
          <b className='text-red-500 text-sm underline mb-2'>{error}</b> <br />
          <span
            className='text-blue-500 font-bold hover:text-blue-400 cursor-pointer'
            onClick={() => {
              signUpHandleModal()
              handleModal()
            }}
          >
            Create account
          </span>
        </div>
      </Modal>
      <SignUp handleModal={signUpHandleModal} modalIsOpen={signUpmodalIsOpen} />
    </>
  )
}

Login.propTypes = {
  handleModal: PropTypes.func,
  modalIsOpen: PropTypes.bool,
  getDisplayName: PropTypes.func
}

export default Login
