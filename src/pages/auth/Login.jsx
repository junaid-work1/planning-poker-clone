import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Modal from 'react-modal'
import PropTypes from 'prop-types'

import { signInWithEmail } from 'services/firebase'
import Button from 'components/elements/Button'
import Input from 'components/elements/Input'
import SignUp from './SignUp'

import { authModalStyles } from 'constants/customStyle'

const Login = ({ handleModal, modalIsOpen, getDisplayName }) => {
  const navigate = useNavigate()

  const [userData, setUserData] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false)
  const [signUpmodalIsOpen, setSignUpmodalIsOpen] = useState(false)

  const inputList = [
    {
      name: 'email',
      type: 'email',
      placeholder: 'Email',
      value: userData.email,
      styling: 'w-full p-2 border-2 border-gray-300 rounded-md'
    },
    {
      name: 'password',
      type: 'password',
      placeholder: 'Password',
      value: userData.password,
      styling: 'w-full p-2 border-2 border-gray-300 rounded-md'
    }
  ]

  const btnStyle = `h-10 w-full px-5 mb-5 text-white font-bold ${
    submitButtonDisabled ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-300'
  }  rounded-lg transition-colors duration-150 focus:shadow-outline`

  const signUpHandleModal = () => setSignUpmodalIsOpen(!signUpmodalIsOpen)

  const handleChange = event => {
    const { name, value } = event.target
    setUserData({
      ...userData,
      [name]: value
    })
  }

  const handleSubmission = () => {
    if (!userData.email || !userData.password) {
      setError('Error! filed should not be empty')
      return
    }
    setError('')
    setSubmitButtonDisabled(true)

    signInWithEmail(
      getDisplayName,
      navigate,
      userData.email,
      userData.password,
      setSubmitButtonDisabled,
      handleModal,
      setUserData,
      setError
    )
  }

  const closeModal = () => {
    handleModal()
    setError('')
  }

  const createAccountHandler = () => {
    signUpHandleModal()
    handleModal()
  }

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        ariaHideApp={false}
        onRequestClose={handleModal}
        style={authModalStyles}
      >
        <div className='mx-auto p-10 relative'>
          <span className='font-bold text-lg'>Sign in</span>
          <div
            className='absolute right-0 -top-2 text-gray-600 text-xl hover:bg-gray-200 px-3 py-2 rounded-2xl font-bold cursor-pointer'
            onClick={closeModal}
          >
            X
          </div>
          <div className='mb-10 mt-6 space-y-7'>
            {inputList.map(item => (
              <Input
                name={item.name}
                type={item.type}
                placeholder={item.placeholder}
                defaultValue={item.value}
                onChange={handleChange}
                className={item.styling}
                key={item.name}
              />
            ))}
          </div>
          <Button
            className={btnStyle}
            disabled={submitButtonDisabled}
            onClick={handleSubmission}
            title={'Login'}
          />
          <b className='text-red-500 text-sm underline mb-2'>{error}</b> <br />
          <span
            className='text-blue-500 font-bold hover:text-blue-400 cursor-pointer'
            onClick={createAccountHandler}
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
