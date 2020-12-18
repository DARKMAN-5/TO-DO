import { List, ListItem, ListItemText, Button, Input} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import React, { useState} from 'react';
import db from './firebase';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

const useStyles = makeStyles((theme) => ({
  root: {
    height: 300,
    flexGrow: 1,
    minWidth: 300,
    transform: 'translateZ(0)',
    '@media all and (-ms-high-contrast: none)': {
      display: 'none',
    },
  },
  modal: {
    display: 'flex',
    padding: theme.spacing(1),
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));


function Todo(props) {
    const classes = useStyles();
    const rootRef = React.useRef(null);
    const [open, setOpen] = useState(false);
    const [input, setInput]= useState('');

    const handleOpen = () => {
          setOpen(true);
    };

    const updateTodo = () => {
        db.collection('todos').doc(props.todo.id).set({
            todo: input
        }, {merge: true})
        setInput('');
        setOpen(false);
    };

    return (
        <>
        <Modal
          disablePortal
          disableEnforceFocus
          disableAutoFocus
          open={open}
          aria-labelledby="server-modal-title"
          aria-describedby="server-modal-description"
          className={classes.modal}
          container={() => rootRef.current}
          onClose={e =>setOpen(false)}
        >
          <div className={classes.paper}>
            <h2 id="server-modal-title">Edit Here!!</h2>
            <p id="server-modal-description">Input Here!</p>
            <Input placeholder={props.todo.todo} value={input} onChange={event => setInput(event.target.value)}/>
            <Button disabled={!setOpen} variant="outlined" color="primary" type="submit" onClick={updateTodo}>Update Todo</Button>
          </div>
        </Modal>
        <List>
            <ListItem>
                <ListItemText primary={props.todo.todo} secondary='Work as fast as you can!'/>
            </ListItem>
            <div>
           <Button onClick={event => setOpen(true)} color="secondary">
               Edit
           </Button>
            </div>
            <div>
            <Button onClick={event => db.collection('todos').doc(props.todo.id).delete()} variant="contained" color="secondary" startIcon={<DeleteIcon />}>
               Delete
           </Button>
            </div>

        </List>
        </>
    )
}

export default Todo
