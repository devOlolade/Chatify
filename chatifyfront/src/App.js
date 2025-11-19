
import React, { useEffect, useState } from 'react';
import { startConnection, getConnection } from './signalRConn';

function App() {
  const [user, setUser] = useState('');
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([]);


  useEffect(() => {
    startConnection().then((conn) => {
      conn.on('ReceiveMessage', (user, message) => {
        setMessages((prev) => [...prev, { user, message }]);
      });
    });
  }, []);

  const sendMessage = async () => {
    if (!user || !text) return;

    const conn = getConnection();
    await conn.invoke('SendMessage', user, text);
    setText('');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Chatify - Real-Time Chat</h2>

      <input
        placeholder="Your name"
        value={user}
        onChange={(e) => setUser(e.target.value)}
        style={{ marginRight: '10px' }}
      />
      <input
        placeholder="Your message"
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ marginRight: '10px' }}
      />
      <button onClick={sendMessage}>Send</button>
      <div style={{ marginTop: 20 }}>
        <h3>Messages:</h3>
        {messages.map((msg, index) => (
          <p key={index}>
            <strong>{msg.user}: </strong> {msg.message}
          </p>
        ))}
      </div>
    </div>
  );

}
export default App;