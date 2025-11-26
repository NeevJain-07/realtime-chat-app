export default function Sidebar({ username, users }) {
  return (
    <aside className="side-panel">
      <div className="side-header">
        <div className="side-title">Online</div>
        <div className="side-you">You: {username}</div>
      </div>
      <ul className="user-list">
        {users.map((u, index) => (
          <li key={index}>{u}</li>
        ))}
      </ul>
    </aside>
  );
}
