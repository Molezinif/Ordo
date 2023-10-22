// Import the necessary functions
import { initializeApp } from 'firebase/app'
import {
  initializeAuth,
  getReactNativePersistence,
  getAuth
} from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage'

const firebaseConfig = {
  apiKey: 'AIzaSyCUEsfyilhZBbEJZjMMNDhYYzyqMWUmuFk',
  wauthDomain: 'ordo-680e1.firebaseapp.com',
  projectId: 'ordo-680e1',
  storageBucket: 'ordo-680e1.appspot.com',
  messagingSenderId: '1094536737155',
  appId: '1:1094536737155:web:8ab09307373ae314cc06b6',
  measurementId: 'G-LB2BV1NGTQ'
}

const app = initializeApp(firebaseConfig)

initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
})
const db = getFirestore(app)

const auth = getAuth(app)

export { app, auth, db }
