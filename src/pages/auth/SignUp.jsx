import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { auth } from 'firebaseConfig'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import Modal from 'react-modal'
import PropTypes from 'prop-types'

import { customStyles } from 'constants/customStyle'
import Input from 'components/elements/Input'

const SignUp = ({ handleModal, modalIsOpen, getDisplayName }) => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    repeatPassword: ''
  })
  const [error, setError] = useState('')
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false)

  const navigate = useNavigate()

  const inputList = [
    { name: 'email', type: 'email', placeholder: 'Email', value: userData.email },
    { name: 'password', type: 'password', placeholder: 'Password', value: userData.password },
    { name: 'name', type: 'text', placeholder: 'Your display name', value: userData.name },
    {
      name: 'repeatPassword',
      type: 'password',
      placeholder: 'Repeat password',
      value: userData.repeatPassword
    }
  ]

  const handleChange = event => {
    const { name, value } = event.target
    setUserData({
      ...userData,
      [name]: value.trim()
    })
  }

  const handleSubmission = () => {
    if (!userData.name || !userData.email || !userData.password || !userData.repeatPassword) {
      setError('Error! filed should not be empty')
      return
    }

    if (userData.password !== userData.repeatPassword) {
      setError('Error! Password are not matching')
      return
    }

    setError('')
    setSubmitButtonDisabled(true)

    createUserWithEmailAndPassword(auth, userData.email, userData.password)
      .then(async response => {
        setSubmitButtonDisabled(false)
        const user = response.user
        await updateProfile(user, {
          displayName: userData.name
        })
        handleModal()
        setUserData({ name: '', email: '', password: '', repeatPassword: '' })
        navigate('/')
        getDisplayName()
      })
      .catch(error => {
        setSubmitButtonDisabled(false)
        setError(error.message)
      })
  }

  return (
    <Modal
      isOpen={modalIsOpen}
      ariaHideApp={false}
      onRequestClose={handleModal}
      style={customStyles}
    >
      <div className='w-96 mx-auto p-10 relative'>
        <span className='font-bold text-lg'>Sign up</span>
        <div
          className='absolute right-0 -top-2 text-gray-600 text-xl hover:bg-gray-200 px-3 py-2 rounded-2xl font-bold cursor-pointer'
          onClick={() => {
            handleModal()
            setError('')
          }}
        >
          X
        </div>
        <div className='mt-6 space-y-10 mb-12'>
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
          Sign Up
        </button>
        <b className='text-red-500 text-sm underline mb-2'>{error}</b>
      </div>
    </Modal>
  )
}

SignUp.propTypes = {
  handleModal: PropTypes.func,
  modalIsOpen: PropTypes.bool,
  getDisplayName: PropTypes.func
}

export default SignUp
