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

export const Header = (props) => {
  const auth = props.auth
  const [open, setOpen]  = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return  (
    <header className="App-header">
      <h1>🔥V Chat🔥</h1>
      <div className='menu'>
        <MeetingRoom className='room' onClick={handleClickOpen}/>
        <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create or enter in perosnal room.</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Room id (Room ID should be unique.)"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Create</Button>
          <Button onClick={handleClose}>Enter</Button>
        </DialogActions>
      </Dialog>
        { auth.currentUser && <ExitToAppOutlined onClick={()=>auth.signOut()}/>}
      </div>
    </header>
    )
}
