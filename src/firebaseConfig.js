import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyAgsIZtIivrKnR4J3eLgaQ0HpRH3b8TWNY',
  authDomain: 'planning-poker-game-6a787.firebaseapp.com',
  projectId: 'planning-poker-game-6a787',
  storageBucket: 'planning-poker-game-6a787.appspot.com',
  messagingSenderId: '1002557091033',
  appId: '1:1002557091033:web:ef626eeed94abc0b7aa2c8',
  measurementId: 'G-K83NNWWP26'
}

const app = initializeApp(firebaseConfig)
const auth = getAuth()

export { app, auth }
