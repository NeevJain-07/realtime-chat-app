export default function ChatBubble({ msg, me }) {
  const isMe = msg.user === me;

  const time =
    msg.time &&
    new Date(msg.time).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <div className={"bubble-row " + (isMe ? "me-row" : "them-row")}>
      <div className={"bubble " + (isMe ? "me-bubble" : "them-bubble")}>
        {!isMe && <div className="bubble-name">{msg.user}</div>}
        <div className="bubble-text">{msg.text}</div>
        {time && <div className="bubble-time">{time}</div>}
      </div>
    </div>
  );
}
