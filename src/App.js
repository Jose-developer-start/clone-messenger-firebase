import { FormControl, InputLabel, Input } from "@mui/material";
import { useEffect, useState } from "react";
import "./App.css";
import Button from "@mui/material/Button";
import Message from "./Message";
import SendIcon from "@mui/icons-material/Send";

import {
  db,
  addDoc,
  collection,
  orderBy,
  onSnapshot
} from "./firebase";
import { serverTimestamp } from "firebase/firestore";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");

  //useState = variable in REACT
  //useEffect = run code on a condition in REACT
  useEffect(() => {
    //const name = prompt('Please enter your name');
    setUsername(prompt("Please enter your name"));

    onSnapshot(collection(db, 'messages'), (snapshot)=>{
      setMessages(snapshot.docs.map(doc =>doc.data()))
    },orderBy('timestamp','desc'));
  }, []);

  const sendMessage = (event) => {
    //all the logic to send a message goes
    event.preventDefault();
    const addData = async () => {
      await addDoc(collection(db, "messages"), {
        username: username,
        message: input,
        timestamp: serverTimestamp()
      });
    };
    addData();

    setInput("");
  };
  return (
    <div className="App">
      <h1>Hello world</h1>
      <h2>Welcome {username}</h2>
      <form className="app__form">
        <FormControl className="form__content">
          <InputLabel>Enter a message</InputLabel>
          <Input
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
          <Button
            disabled={!input}
            variant="contained"
            color="primary"
            type="submit"
            onClick={sendMessage}
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
