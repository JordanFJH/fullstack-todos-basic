function Todo({ item, completeTodo, deleteTodo }) {
  return (
    <li style={{ listStyle: "none" }}>
      <input
        type="checkbox"
        checked={item.completed}
        onChange={() => completeTodo(item._id)}
      />
      {item.text}
      <button onClick={() => deleteTodo(item._id)}>x</button>
    </li>
  );
}

export default Todo;
