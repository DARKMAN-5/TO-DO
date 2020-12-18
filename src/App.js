import React, { useState, useEffect} from 'react';
import { Button, FormControl, InputLabel, Input} from '@material-ui/core';
import './App.css';
import Todo from './Todo';
import db from './firebase';
import firebase from 'firebase';

function App() {
  const [todos, setTodos]= useState([]);
  const [input, setInput]= useState('');
  
  useEffect(() => {
    db.collection('todos').orderBy('timestamp', 'asc').onSnapshot(snapshot => {
      setTodos(snapshot.docs.map(doc => ({id: doc.id, todo: doc.data().todo})))
    })
  }, []);

  const addTodo = (event) =>{

    event.preventDefault();
    db.collection('todos').add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    })
    setInput('');
  }
  
  return (
    <div className="App">
      <h1>Welcome to To-do list!!</h1>
      <FormControl>
        <InputLabel>Write To-do</InputLabel>
        <Input value={input} onChange={event => setInput(event.target.value)}/>
      <Button type="submit" disabled={!input} variant="contained" color="primary" onClick={addTodo}>
        Add Todo
      </Button>
      </FormControl>
      <ul>
        {todos.map(todo => (
          <Todo todo={todo}/> 
        ))}
      </ul>
    </div>

  );
}

export default App;
