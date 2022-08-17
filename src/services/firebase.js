import { auth } from 'firebaseConfig'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile
} from 'firebase/auth'

export const signInWithEmail = (
  getDisplayName,
  navigate,
  email,
  password,
  setSubmitButtonDisabled,
  handleModal,
  setUserData,
  setError
) => {
  signInWithEmailAndPassword(auth, email, password)
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

export const signUpWithEmails = (
  getDisplayName,
  navigate,
  email,
  password,
  name,
  setSubmitButtonDisabled,
  handleModal,
  setUserData,
  setError
) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then(async response => {
      setSubmitButtonDisabled(false)
      const user = response.user
      await updateProfile(user, {
        displayName: name
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

export const logOut = setError => {
  signOut(auth)
    .then(() => {})
    .catch(error => setError(error))
}
