// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// import { getAnalytics } from 'firebase/analytics'
import { connectAuthEmulator, getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyDvoTAfoH6BSz2SUJcpMgma-7x5Vwsxs4o',
	authDomain: 'chat-app-8bc61.firebaseapp.com',
	projectId: 'chat-app-8bc61',
	storageBucket: 'chat-app-8bc61.appspot.com',
	messagingSenderId: '243445967363',
	appId: '1:243445967363:web:b1607c2a063bf366e73c36',
	measurementId: 'G-WSRKG1JD87',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
// const analytics = getAnalytics(app)
const auth = getAuth()
const storage = getStorage()
const db = getFirestore()

// Connect your app to the Firebase Emulator
connectAuthEmulator(auth, 'http://localhost:9099')
connectFirestoreEmulator(db, 'localhost', 8080)

export { app, auth, storage, db }
