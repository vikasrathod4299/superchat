import React from 'react'
import "./signin.css"
export const SignIn = (props) => {
  const auth  = props.auth
  const firebase = props.firebase
  
  const signInWithGoogle =()=>{
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
  }
  return (
    <section>
        <button className="sign-in" onClick={signInWithGoogle}>Sign in with Google</button>
    </section>
  )
}
