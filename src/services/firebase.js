import {
  createUserWithEmailAndPassword,
  deleteUser,
  getAuth,
  signInWithEmailAndPassword,
  updateEmail,
  updatePassword,
  updateProfile
} from 'firebase/auth'
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
import { ulid } from 'ulid'
import { toast } from 'react-toastify'
import { auth, db } from 'firebaseConfig'

import {
  GAME_COLLECTION,
  PLAYER_COLLECTION,
  ISSUE_COLLECTION,
  VOTING_COLLECTION
} from 'constants/collectionName'

import 'react-toastify/dist/ReactToastify.css'

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

const gamesCollectionName = collection(db, GAME_COLLECTION)
const playersCollectionName = collection(db, PLAYER_COLLECTION)
const issueCollectionName = collection(db, ISSUE_COLLECTION)
const votingCollectionName = collection(db, VOTING_COLLECTION)

export const addGameToStore = async (gameId, data) =>
  await setDoc(doc(gamesCollectionName, gameId), data)

export const getGameFromStore = async id => {
  const docRef = doc(db, GAME_COLLECTION, id)
  const result = await getDoc(docRef)
  let game = undefined
  if (result.exists) {
    game = result.data()
  }
  return game
}

export const addPlayersToStore = async (playerId, data) => {
  await setDoc(doc(playersCollectionName, playerId), data)
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
}

export const deleteIssueToStore = async (id, gameId) => {
  await deleteDoc(doc(db, ISSUE_COLLECTION, id))
  getIssueFromStore(gameId)
}

export const getPlayerFromStore = async (gameId, playerId) => {
  const docRef = doc(db, PLAYER_COLLECTION, playerId)
  const docData = await getDoc(docRef)
  let player = undefined
  if (docData.exists()) {
    player = docData.data()
  } else {
    toast.error('No data founded!', { theme: 'colored' })
  }
  return player
}

export const updatePlayerInStore = async (gameId, player) =>
  await setDoc(doc(db, PLAYER_COLLECTION, player.id), player)

export const getPlayersFromStore = async gameId => {
  let players = []
  const getPlayerQuery = query(collection(db, PLAYER_COLLECTION), where('gameId', '==', gameId))
  const docData = await getDocs(getPlayerQuery)
  docData.forEach(doc => {
    players.push(doc.data())
  })

  return players
}

export const updateGameDataInStore = async (gameId, data) => {
  const docRef = doc(db, GAME_COLLECTION, gameId)
  await updateDoc(docRef, data)
}

export const getCompleteGameData = id =>
  query(collection(db, GAME_COLLECTION), where('id', '==', id))

export const getAllPlayersFromStore = id =>
  query(collection(db, PLAYER_COLLECTION), where('gameId', '==', id))

export const getIssueFromStore = id =>
  query(collection(db, ISSUE_COLLECTION), where('gameId', '==', id))

export const getVotesFromStore = id =>
  query(collection(db, VOTING_COLLECTION), where('gameId', '==', id))

export const changeProfileNameInStore = (
  name,
  setBooleanStates,
  booleanStates,
  getDisplayName,
  setAccountData
) => {
  const auth = getAuth()

  if (name) {
    updateProfile(auth.currentUser, {
      displayName: name
    }).then(() => {
      setBooleanStates({ ...booleanStates, nameDiv: !booleanStates.nameDiv })
      getDisplayName()
      setAccountData({ name: '', email: '', password: '' })
    })
  }
}

export const changeEmailInStore = (
  email,
  setBooleanStates,
  booleanStates,
  getDisplayName,
  setAccountData
) => {
  const auth = getAuth()
  const newEmail = email
  if (email) {
    updateEmail(auth.currentUser, newEmail).then(() => {
      setBooleanStates({ ...booleanStates, emailDiv: !booleanStates.emailDiv })
      getDisplayName()
      setAccountData({ name: '', email: '', password: '' })
    })
  }
}

export const changePasswordInStore = (
  password,
  setBooleanStates,
  booleanStates,
  setAccountData
) => {
  const auth = getAuth()
  const user = auth.currentUser
  const newPassword = password

  if (password) {
    updatePassword(user, newPassword).then(() => {
      setBooleanStates({ ...booleanStates, passwordDiv: !booleanStates.passwordDiv })
      setAccountData({ name: '', email: '', password: '' })
    })
  }
}

export const deleteUserFromStore = (handleModal, getDisplayName, setAccountData) => {
  const auth = getAuth()
  const user = auth.currentUser

  deleteUser(user).then(() => {
    handleModal()
    getDisplayName()
    setAccountData({ name: '', email: '', password: '' })
  })
}

export const addVotingHistoryToStore = async (activeIssue, game) => {
  const votingData = {
    id: ulid(),
    gameId: game.id,
    IssueId: activeIssue.id,
    issueTitle: activeIssue.title,
    playerCount: game.player.length,
    gameName: game.name,
    average: game.average,
    createdAt: new Date()
  }

  await setDoc(doc(votingCollectionName, votingData.id), votingData)
}

export const deleteVoteToStore = async (id, gameId) => {
  await deleteDoc(doc(db, VOTING_COLLECTION, id))
  getVotesFromStore(gameId)
}
