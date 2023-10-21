// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCUEsfyilhZBbEJZjMMNDhYYzyqMWUmuFk',
  wauthDomain: 'ordo-680e1.firebaseapp.com',
  projectId: 'ordo-680e1',
  storageBucket: 'ordo-680e1.appspot.com',
  messagingSenderId: '1094536737155',
  appId: '1:1094536737155:web:8ab09307373ae314cc06b6',
  measurementId: 'G-LB2BV1NGTQ'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
