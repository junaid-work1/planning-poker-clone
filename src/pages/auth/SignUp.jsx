import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Modal from 'react-modal'
import PropTypes from 'prop-types'

import { customStyles } from 'constants/customStyle'
import { signUpWithEmails } from 'services/firebase'
import Button from 'components/elements/Button'
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
    },
    {
      name: 'name',
      type: 'text',
      placeholder: 'Your display name',
      value: userData.name,
      styling: 'w-full p-2 border-2 border-gray-300 rounded-md'
    },
    {
      name: 'repeatPassword',
      type: 'password',
      placeholder: 'Repeat password',
      value: userData.repeatPassword,
      styling: 'w-full p-2 border-2 border-gray-300 rounded-md'
    }
  ]

  const btnStyle = `h-10 w-full px-5 mb-5 text-white font-bold ${
    submitButtonDisabled ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-300'
  }  rounded-lg transition-colors duration-150 focus:shadow-outline`

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

    signUpWithEmails(
      getDisplayName,
      navigate,
      userData.email,
      userData.password,
      userData.name,
      setSubmitButtonDisabled,
      handleModal,
      setUserData,
      setError
    )
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
          title={'Sign Up'}
        />

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
