import './header.css';
import {ExitToAppOutlined, MeetingRoom} from "@material-ui/icons"
import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';

export const Header = (props) => {
  const auth = props.auth
  const firestore = props.firestore
  const [user] = useAuthState(auth)
  const [open, setOpen]  = useState(false);
  const [inputs, setInputs] = useState({});
  const [roomId, setRoomId] = useState('global')
  const [error, setError] = useState();
  const [query, setQuery] = useState();
  const roomRef = firestore.collection('rooms')
  const [rooms] = useCollectionData(query, {idField:'id'})
  
  props.func(roomId);

  const onChange = (e)=>{
    setInputs((prev)=>{
      return {...prev,[e.target.name]:e.target.value}
    })
  }

  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleEnter = (e) => {
    setRoomId(inputs.roomId)
    setOpen(false);
  };

  const handleClose = (e) => {
    setOpen(false);
  };

  const handleCreate = async(e) => {
    e.preventDefault()
    const q = roomRef.where("roomId","==",inputs.roomId)
    await setQuery(q)
    
    if (rooms.length>=1){
      setError("Room Alreadey Exist...")
      console.log(error)
    }
    else{
      try{
      await roomRef.add({
        roomId:roomId,
      })
      setError("Room is created...")
      console.log("room Is created")
      console.log(error)
    }catch(e){
      console.log(e)
    }
      
    }
  };


  return  (
    <header className="App-header">
      <h1>🔥V Chat🔥</h1>
      <div className='menu'>
        <MeetingRoom className='room' onClick={handleClickOpen}/>
        <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create or enter in private room.</DialogTitle>

        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="roomId"
            id="roomId"
            label="Room id (Room ID should be unique.)"
            type="text"
            fullWidth
            variant="standard"
            onChange={onChange}
          />
        </DialogContent>
        <DialogActions>
          <Button type="submit" onClick={handleCreate}>Create</Button>
          <Button type="submit" onClick={handleEnter}>Enter</Button>
        </DialogActions>
      </Dialog>
        { auth.currentUser && <ExitToAppOutlined onClick={()=>auth.signOut()}/>}
      </div>
    </header>
    )
}
