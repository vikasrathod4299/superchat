import './App.css';
import React from 'react';
import firebase from "firebase/compat/app"
import "firebase/compat/firestore"
import "firebase/compat/auth"
import {useAuthState} from "react-firebase-hooks/auth"
import {Header} from "./components/Header/Header.jsx"
import { SignIn } from './components/SignIn/SignIn.jsx';
import { Chatroom } from './components/Chatroom/Chatroom.jsx';

firebase.initializeApp({
  apiKey: "AIzaSyDyu43tHCk6GRW1cL3OHhHk_bat0OMaA8Y",
  authDomain: "chat-app-e5954.firebaseapp.com",
  projectId: "chat-app-e5954",
  storageBucket: "chat-app-e5954.appspot.com",
  messagingSenderId: "769554908925",
  appId: "1:769554908925:web:26f8080b64d8812f632094"
})

const auth = firebase.auth();
const firestore = firebase.firestore();
function App() {
  const [user] =useAuthState(auth)
  return  (
    <div className="App">
      <Header auth = {auth}/>
      {user ? <Chatroom auth = {auth} firestore = {firestore} firebase={firebase}/> : <SignIn auth = {auth} firebase = {firebase} />}
    </div>
  );
}

export default App;
