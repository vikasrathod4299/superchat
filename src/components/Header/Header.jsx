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
  const [passerr,setPassErr] = useState('')
  const roomRef = firestore.collection('rooms')
  const q = inputs.roomId && roomRef.where("roomId","==",inputs.roomId)
  const [rooms] = useCollectionData(q, {idField:'id'})
  props.func(roomId);

  const onChange = (e)=>{
    setInputs((prev)=>{
      return {...prev,[e.target.name]:e.target.value}
    })
  }

  const handleClose = (e) => {
    setOpen(false);
  };
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleEnter = (e) => {
    if (rooms.length<=0){
      setError("Room doesn't Exist...")
    }else{
      if (rooms[0].password == inputs.password){
        setRoomId(inputs.roomId)
        setOpen(false);
      }else{
        setPassErr("Incorrect password...")
      }
    }
  };

  const handleExitRoom = (e)=>{
    setRoomId('global')
    setOpen(false)
  }

  const handleCreate = async(e) => {
    e.preventDefault()
    
    if (rooms.length>=1){
      setError("Room Alreadey Exist...")
    }

    else{
        await roomRef.add({
        roomId:inputs.roomId,
        password:inputs.password
      })
      setError("Room is created...")
    }

  };


  return  (
    <header className="App-header">
      <h1>🔥V Chat🔥</h1>
      {roomId!='global'&& <h9 className="room-name">Room : {roomId}</h9>}
        
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
                label={!error ?"Room id (Room ID should be unique.)": error}
                type="text"
                fullWidth
                variant="standard"
                onChange={onChange}
            />
              <TextField
                autoFocus
                margin="dense"
                name="password"
                id="password"
                label={!passerr ? "Enter Password": passerr}
                type="password"
                fullWidth
                variant="standard"
                onChange={onChange}
              />
            
            </DialogContent>

            <DialogActions>
              <Button type="submit" onClick={handleExitRoom}>Public</Button>
              <Button type="submit" onClick={handleCreate}>Create</Button>
              <Button type="submit" onClick={handleEnter}>Enter</Button>
            </DialogActions>
      </Dialog>

        { auth.currentUser && <ExitToAppOutlined onClick={()=>auth.signOut()}/>}
      </div>
    </header>
    )
}
