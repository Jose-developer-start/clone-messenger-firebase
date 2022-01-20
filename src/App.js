import { FormControl, InputLabel,Input } from "@mui/material";
import { useEffect, useState } from "react";
import "./App.css";
import Button from "@mui/material/Button";
import Message from "./Message";
import SendIcon from '@mui/icons-material/Send';

import {db,addDoc,getDocs,onSnapshot,collection,doc} from "./firebase"
import { orderBy } from "@firebase/firestore";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [username,setUsername] = useState('');

  //useState = variable in REACT
  //useEffect = run code on a condition in REACT
  const getAll = async ()=>{
    const getAllMessage = await getDocs(collection(db,'messages'),orderBy('current'));
    setMessages(getAllMessage.docs.map(doc => doc.data()))
  }
  useEffect(()=>{
    /*db.collection('messages').onSnapshot(snapshot =>{
      setMessages(snapshot.docs.map(doc => doc.data()))
    })*/
    setInterval(()=>{
      getAll();
    },1000)
  },[])

  useEffect(()=>{
    //const name = prompt('Please enter your name');
    setUsername(prompt('Please enter your name'))
  },[])

  const sendMessage = (event) => {
    //all the logic to send a message goes
    var fecha= new Date()
    var horas= fecha.getHours()
    var minutos = fecha.getMinutes()
    var segundos = fecha.getSeconds()
    
    let date = horas + ":" + minutos + ":" + segundos;
    event.preventDefault();
    const addData =  async ()=>{
      await addDoc(collection(db,'messages'), {
        username: username,
        message: input,
        current: date
      });
    }
    addData();
    
    setInput("");
  };
  return (
    <div className="App">
      <h1>Hello world</h1>
      <h2>Welcome {username}</h2>
      <form className="app__form">
        <FormControl className="form__content">
          <InputLabel >Enter a message</InputLabel>
          <Input  value={input}
          onChange={(event) => setInput(event.target.value)}/>
        <Button disabled={!input} variant="contained" color="primary" type="submit" onClick={sendMessage}
          >
          <SendIcon />
          </Button>
        </FormControl>

      </form>
    {messages.map((message) => (
        <Message username={username} message={message} />
      ))}
    

      
    </div>
  );
}

export default App;
