Real-Time Chat App

A simple, clean, WhatsApp-style real-time chat application built using React, Socket.IO, and Node.js.

This project demonstrates real-time communication, UI layout skills, state management, and a polished messaging interface.

Features

Real-Time Messaging

Messages appear instantly for all connected users using WebSocket communication through Socket.IO.

Modern Chat UI

our messages appear on the right.
Other users' messages appear on the left.
Clean chat bubbles with timestamps.
Smooth fade animations.

Typing Indicator

Shows when another user is typing.

Online Users Panel

A simple sidebar listing everyone currently connected.

Auto-Scroll to Latest Message

The chat always scrolls to the newest message automatically.

Join/Leave System Messages

When a user enters or leaves the chat, the system broadcasts it.

Project Structure

realtime-chat-app/
│
├── server/
│   ├── server.js
│   └── package.json
│
└── client/
    ├── index.html
    ├── package.json
    └── src/
        ├── App.jsx
        ├── ChatBubble.jsx
        ├── Sidebar.jsx
        ├── styles.css
        └── main.jsx

How It Works (Simple Explanation)

1. User joins the chat

They enter a username.
The client sends it to the server via `socket.emit("join")`.
The server stores their name and sends updated online users to everyone.

2. Sending messages

When a user sends a message, `socket.emit("message")` sends it to the server.
The server sends it to all clients.
Each client displays it as a chat bubble.

3. Typing indicator

While typing, the client emits `socket.emit("typing", true)`.
The server broadcasts it to others.

4. Auto-scroll

A `ref` scrolls the message container to the newest message on every update.

How to Run the Project

1. Start the Server

cd server
npm install
npm start

Runs on [http://localhost:4000](http://localhost:4000)

2. Start the Client (Frontend)

cd client
npm install
npm run dev


Open in your browser:

http://localhost:5173

Open the app in two tabs or two devices to test real-time chatting.# realtime-chat-app
