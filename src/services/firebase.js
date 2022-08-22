import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile
} from 'firebase/auth'
import { ulid } from 'ulid'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { auth, db } from 'firebaseConfig'
import { Game_Collection, Player_Collection, Issue_Collection } from 'constants/collectionName'
import {
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where
} from 'firebase/firestore'

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

const gamesCollectionName = collection(db, Game_Collection)
const playersCollectionName = collection(db, Player_Collection)
const issueCollectionName = collection(db, Issue_Collection)

export const addGameToStore = async (gameId, data) => {
  await setDoc(doc(gamesCollectionName, gameId), data)
  return true
}

export const getGameFromStore = async id => {
  const docRef = doc(db, Game_Collection, id)
  const result = await getDoc(docRef)
  let game = undefined
  if (result.exists) {
    game = result.data()
  }
  return game
}

export const addPlayersToStore = async (playerId, data) => {
  await setDoc(doc(playersCollectionName, playerId), data)
  return true
}

export const updatePlayerInGameInStore = async (id, data) => {
  const docRef = doc(gamesCollectionName, id)
  await updateDoc(docRef, {
    player: arrayUnion(data)
  })
}

export const addIssueToStore = async (gameId, title) => {
  const issue = { id: ulid(), title, gameId }
  setDoc(doc(issueCollectionName, issue.id), issue)

  return true
}

export const deleteIssueToStore = async (id, gameId) => {
  await deleteDoc(doc(db, Issue_Collection, id))
  getIssueFromStore(gameId)

  return true
}

export const getPlayerFromStore = async (gameId, playerId) => {
  const docRef = doc(db, Player_Collection, playerId)
  const docData = await getDoc(docRef)
  let player = undefined
  if (docData.exists()) {
    player = docData.data()
  } else {
    toast.error('No data founded!', { theme: 'colored' })
  }
  return player
}

export const updatePlayerInStore = async (gameId, player) => {
  await setDoc(doc(db, Player_Collection, player.id), player)

  return true
}

export const getPlayersFromStore = async gameId => {
  let players = []
  const getPlayerQuery = query(collection(db, Player_Collection), where('gameId', '==', gameId))
  const docData = await getDocs(getPlayerQuery)
  docData.forEach(doc => {
    players.push(doc.data())
  })

  return players
}

export const updateGameDataInStore = async (gameId, data) => {
  const docRef = doc(db, Game_Collection, gameId)
  await updateDoc(docRef, data)

  return true
}

export const getCompleteGameData = id => {
  return query(collection(db, Game_Collection), where('id', '==', id))
}

export const getAllPlayersFromStore = id => {
  return query(collection(db, Player_Collection), where('gameId', '==', id))
}

export const getIssueFromStore = id => {
  return query(collection(db, Issue_Collection), where('gameId', '==', id))
}
