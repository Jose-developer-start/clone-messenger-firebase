import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import "./Message.css";
function Message({username,message}) {
    const isUser = username === message.username;
  return (
      <div className={`message ${isUser && 'message__user'}`}>
          <Card className={isUser ? 'message__userCard': 'message__guestCard'}>
            <CardContent>
                <Typography variant="h5" component="div">
                {message.username}:{message.message}
                </Typography>
            </CardContent>
            </Card>
      </div>
  );
}

export default Message;
