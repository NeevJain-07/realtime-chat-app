import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import ChatBubble from "./ChatBubble";
import Sidebar from "./Sidebar";

const socket = io("http://localhost:4000");

export default function App() {
  const [username, setUsername] = useState("");
  const [joined, setJoined] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [typingUser, setTypingUser] = useState(null);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    const handleMessage = (msg) => {
      setMessages((prev) => [...prev, msg]);
    };

    const handleUsers = (list) => {
      setUsers(list);
    };

    const handleTyping = ({ user, typing }) => {
      setTypingUser(typing ? user : null);
    };

    socket.on("message", handleMessage);
    socket.on("users", handleUsers);
    socket.on("typing", handleTyping);

    return () => {
      socket.off("message", handleMessage);
      socket.off("users", handleUsers);
      socket.off("typing", handleTyping);
    };
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleJoin = () => {
    const name = username.trim();
    if (!name) return;
    socket.emit("join", name);
    setJoined(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = message.trim();
    if (!text) return;
    socket.emit("message", text);
    socket.emit("typing", false);
    setMessage("");
  };

  if (!joined) {
    return (
      <div className="login-page">
        <div className="login-box">
          <h1>Chat Demo</h1>
          <p>Choose a name to start chatting.</p>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Your name"
          />
          <button onClick={handleJoin}>Join</button>
        </div>
      </div>
    );
  }

  return (
    <div className="app-shell">
      <Sidebar username={username} users={users} />

      <div className="chat-column">
        <header className="chat-topbar">
          <span className="chat-title">Chat</span>
        </header>

        <div className="chat-scroll">
          {messages.map((msg, index) => (
            <ChatBubble key={index} msg={msg} me={username} />
          ))}
          <div ref={messagesEndRef} />
        </div>

        {typingUser && typingUser !== username && (
          <div className="typing-row">{typingUser} is typing…</div>
        )}

        <form className="chat-input-row" onSubmit={handleSubmit}>
          <input
            value={message}
            onChange={(e) => {
              const text = e.target.value;
              setMessage(text);
              socket.emit("typing", text.length > 0);
            }}
            placeholder="Type a message…"
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}
