import { useState } from 'react'
import Modal from 'react-modal'
import PropTypes from 'prop-types'

import {
  changeEmailInStore,
  changePasswordInStore,
  changeProfileNameInStore,
  deleteUserFromStore
} from 'services/firebase'
import Button from 'components/elements/Button'
import Input from 'components/elements/Input'
import { accountSettingStyles } from 'constants/customStyle'

const AccountSetting = ({ handleModal, modalIsOpen, getDisplayName, userEmail, activeUser }) => {
  const [accountData, setAccountData] = useState({ name: '', email: '', password: '' })
  const [booleanStates, setBooleanStates] = useState({
    nameDiv: true,
    emailDiv: true,
    passwordDiv: true
  })

  const changeHandle = event => {
    const { name, value } = event.target
    setAccountData({ ...accountData, [name]: value })
  }

  const changeDisplayName = () => {
    changeProfileNameInStore(
      accountData.name,
      setBooleanStates,
      booleanStates,
      getDisplayName,
      setAccountData
    )
  }

  const changeEmail = () => {
    changeEmailInStore(
      accountData.email,
      setBooleanStates,
      booleanStates,
      getDisplayName,
      setAccountData
    )
  }

  const changePassword = () => {
    changePasswordInStore(accountData.password, setBooleanStates, booleanStates, setAccountData)
  }

  const deleteCurrentUser = () => {
    deleteUserFromStore(handleModal, getDisplayName, setAccountData)
  }

  const changeNameHandler = () =>
    setBooleanStates({ ...booleanStates, nameDiv: !booleanStates.nameDiv })

  const changeEmailHandler = () =>
    setBooleanStates({ ...booleanStates, emailDiv: !booleanStates.emailDiv })

  const changePasswordHandler = () =>
    setBooleanStates({ ...booleanStates, passwordDiv: !booleanStates.passwordDiv })

  const nameDivBtnList = [
    {
      styles: 'border-2 border-gray-200 text-blue-400 w-5/12 py-2 rounded-md hover:bg-blue-100',
      title: 'Cancel',
      method: changeNameHandler
    },
    {
      styles: 'text-white bg-blue-500 w-5/12 py-2.5 rounded-md hover:bg-blue-400',
      title: 'Confirm',
      method: changeDisplayName
    }
  ]

  const emailDivBtnList = [
    {
      styles: 'border-2 border-gray-200 text-blue-400 w-5/12 py-2 rounded-md hover:bg-blue-100',
      title: 'Cancel',
      method: changeEmailHandler
    },
    {
      styles: 'text-white bg-blue-500 w-5/12 py-2.5 rounded-md hover:bg-blue-400',
      title: 'Confirm',
      method: changeEmail
    }
  ]

  const passwordDivBtnList = [
    {
      styles: 'border-2 border-gray-200 text-blue-400 w-5/12 py-2 rounded-md hover:bg-blue-100',
      title: 'Cancel',
      method: changePasswordHandler
    },
    {
      styles: 'text-white bg-blue-500 w-5/12 py-2.5 rounded-md hover:bg-blue-400',
      title: 'Confirm',
      method: changePassword
    }
  ]

  const displayNameDiv = (
    <div className='space-y-2'>
      <p className='text-md font-bold'>Display name</p>
      <div className='flex justify-between'>
        {activeUser}
        <a className='text-blue-400 font-bold cursor-pointer' onClick={changeNameHandler}>
          Change
        </a>
      </div>
    </div>
  )
  const renameDiv = (
    <div className='space-y-5'>
      <p className='text-md font-bold'>Display name</p>
      <Input
        name='name'
        className='w-full p-2 border-2 border-gray-200 rounded-md'
        placeholder='New name'
        type='text'
        value={accountData.name}
        onChange={changeHandle}
      />
      <div className='space-x-5 text-center'>
        {nameDivBtnList.map((item, index) => (
          <Button
            key={index.toString() + 1}
            className={item.styles}
            title={item.title}
            onClick={item.method}
          />
        ))}
      </div>
    </div>
  )

  const displayEmailDiv = (
    <div className='space-y-2'>
      <p className='text-md font-bold'>Email</p>
      <div className='flex justify-between'>
        {userEmail}
        <a className='text-blue-400 ml-4 font-bold cursor-pointer' onClick={changeEmailHandler}>
          Change
        </a>
      </div>
    </div>
  )
  const renameEmailDiv = (
    <div className='space-y-5'>
      <p className='text-md font-bold'>Email</p>
      <Input
        name='email'
        className='w-full p-2 border-2 border-gray-200 rounded-md'
        placeholder='New email'
        type='text'
        value={accountData.email}
        onChange={changeHandle}
      />
      <div className='space-x-5 text-center'>
        {emailDivBtnList.map((item, index) => (
          <Button
            key={index.toString() + 1}
            className={item.styles}
            title={item.title}
            onClick={item.method}
          />
        ))}
      </div>
    </div>
  )

  const displayPasswordDiv = (
    <div className='space-y-2'>
      <p className='text-md font-bold'>Password</p>
      <div className='flex justify-between'>
        *******
        <a className='text-blue-400 font-bold cursor-pointer' onClick={changePasswordHandler}>
          Change
        </a>
      </div>
    </div>
  )
  const changePasswordDiv = (
    <div className='space-y-5'>
      <p className='text-md font-bold'>Password</p>
      <Input
        type='text'
        className='w-full p-2 border-2 border-gray-200 rounded-md'
        name='password'
        placeholder='New password'
        value={accountData.password}
        onChange={changeHandle}
      />

      <div className='space-x-5 text-center'>
        {passwordDivBtnList.map((item, index) => (
          <Button
            key={index.toString() + 1}
            className={item.styles}
            title={item.title}
            onClick={item.method}
          />
        ))}
      </div>
    </div>
  )

  return (
    <Modal
      isOpen={modalIsOpen}
      ariaHideApp={false}
      onRequestClose={handleModal}
      style={accountSettingStyles}
    >
      <p className='text-lg font-bold'>My Account</p>
      <div className='w-full mx-auto p-10 relative'>
        <div
          className='absolute right-0 -top-10 text-gray-600 text-xl hover:bg-gray-200 px-3 py-2 rounded-2xl font-bold cursor-pointer'
          onClick={handleModal}
        >
          X
        </div>
        <div className='display-name-box space-y-8'>
          {booleanStates.nameDiv ? displayNameDiv : renameDiv}
          {booleanStates.emailDiv ? displayEmailDiv : renameEmailDiv}
          {booleanStates.passwordDiv ? displayPasswordDiv : changePasswordDiv}
        </div>
      </div>

      <Button
        className='text-white bg-red-500 px-4 py-2 rounded-lg mx-9 font-bold'
        title='Delete Account'
        onClick={deleteCurrentUser}
      />
    </Modal>
  )
}

AccountSetting.propTypes = {
  handleModal: PropTypes.func,
  modalIsOpen: PropTypes.bool,
  getDisplayName: PropTypes.func,
  activeUser: PropTypes.string,
  userEmail: PropTypes.string
}

export default AccountSetting
