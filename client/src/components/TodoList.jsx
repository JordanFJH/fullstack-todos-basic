import Todo from "./Todo";

function TodoList({ todos, listType, completeTodo, deleteTodo }) {
  let filteredTodos = todos.filter((item) => {
    if (listType === "all") {
      return true;
    } else if (listType === "complete") {
      if (item.completed === true) {
        return true;
      }
    } else {
      if (item.completed === false) {
        return true;
      }
    }
    return false;
  });

  return (
    <ul>
      {filteredTodos.map((item, index) => (
        <Todo
          key={item._id}
          item={item}
          completeTodo={completeTodo}
          deleteTodo={deleteTodo}
        />
      ))}
    </ul>
  );
}

export default TodoList;
