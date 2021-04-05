import firebase from 'firebase/app'
import 'firebase/auth'

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: 'AIzaSyDgAQlusB9T6IyYi14WO6-XKtnKEL21c5g',
  authDomain: 'assignment-10-16846.firebaseapp.com',
  projectId: 'assignment-10-16846',
  storageBucket: 'assignment-10-16846.appspot.com',
  messagingSenderId: '1070783098329',
  appId: '1:1070783098329:web:0bb4bd5e5bd9ef163a7dc8',
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

// export
const auth = firebase.auth()
const googleAuthProvider = new firebase.auth.GoogleAuthProvider()

export { auth, googleAuthProvider }
