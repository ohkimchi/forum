import * as firebase from 'firebase/firebase'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyDllzovC1YT7zlssPkY9ZqXiysgutS19I4',
  authDomain: 'forum-app-12822.firebaseapp.com',
  databaseURL: 'https://forum-app-12822.firebaseio.com',
  projectId: 'forum-app-12822',
  storageBucket: 'forum-app-12822.appspot.com',
  messagingSenderId: '247227593406',
  appId: '1:247227593406:web:daf730938741ea99ab24ef',
  measurementId: 'G-8ZN98439B5'
}

firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()
db.settings({ timestampsInSnapshots: true })
export const accountsCollection = db.collection('accounts')
