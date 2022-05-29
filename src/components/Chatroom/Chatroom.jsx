import React, {useRef ,useState } from 'react'
import {useCollectionData} from "react-firebase-hooks/firestore"  
import { format } from 'timeago.js'
import './chatroom.css'


export const Chatroom = (props) => {
    const dummy = useRef();
    const firestore = props.firestore
    const firebase = props.firebase
    const auth = props.auth
    const messageRef = firestore.collection('massages')
    const query = messageRef.orderBy('createdAt','desc').limit(25);
    const [messages] = useCollectionData(query, {idField:'id'})
    const [formValue, setFormValue] = useState('');

    const sendMessage = async(e)=>{
        e.preventDefault();
        const {uid, photoURL} = auth.currentUser;
        await messageRef.add({
            text: formValue,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            uid,
            photoURL
          })
      setFormValue('')
      dummy.current.scrollIntoView({ behavior: 'smooth' });
    }

  return (
    <>
        <section>
        <main>
            {messages && messages.reverse().map((msg) => <Chatmessage key={msg.createdAt} message={msg} auth = {auth} />)}
            <div ref={dummy}></div>
        </main>

        <form onSubmit={sendMessage}>
            <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="Say Hello...👋" /  >
            <button type="submit" disabled={!formValue}>💌</button>
        </form>

        </section>
    </>
  )
}



function Chatmessage(props){
    const auth = props.auth
    const { text, uid, photoURL, createdAt } = props.message;
    const messageClass = uid === auth.currentUser?.uid ? 'sent' : 'received';
 return (
    <div className={`message ${messageClass}`}>

        <img src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} />
        <p>{text}</p>
        
    </div>
 )
}