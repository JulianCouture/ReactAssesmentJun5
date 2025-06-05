export default function TodoStats({ todos }) {
  const total = todos.length;
  const active = todos.filter((todo) => !todo.completed).length;
  const completed = total - active;
  const highestPriorityTodo = todos
    .filter((todo) => !todo.completed)
    .sort((a, b) => {
      const p = { Low: 1, Medium: 2, High: 3 };
      return p[b.priority] - p[a.priority];
    })[0];

  return (
    <div className="todo-stats">
      <p>Total: {total}</p>
      <p>Active: {active}</p>
      <p>Completed: {completed}</p>
      <p>
        Top Priority Todo:{" "}
        {highestPriorityTodo ? highestPriorityTodo.title : "None"}
      </p>
    </div>
  );
}
