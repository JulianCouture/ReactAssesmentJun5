import { useState } from "react";

export default function TodoList({ todos, toggleTodo, deleteTodo, editTodo }) {
  const activeTodos = todos.filter((todo) => !todo.completed);
  const completedTodos = todos.filter((todo) => todo.completed);

  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [editDate, setEditDate] = useState("");

  const handleEdit = (id, text, date) => {
    editTodo(id, text, date);
    setEditingId(null);
    setEditText("");
    setEditDate("");
  };

  const renderTodo = (todo) => (
    <li
      key={todo.id}
      className={`todo-item ${todo.completed ? "completed" : ""}`}
    >
      {editingId === todo.id ? (
        <div className="todo-top-line">
          <input
            className="edit-input"
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            placeholder="Edit title"
          />
          <input
            className="edit-input"
            type="date"
            value={editDate}
            onChange={(e) => setEditDate(e.target.value)}
          />
          <div className="todo-actions-wrapper">
            <button
              className="edit-save-btn"
              onClick={() => handleEdit(todo.id, editText, editDate)}
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        <div className="todo-top-line">
          <span className={`priority-${todo.priority.toLowerCase()}`}>
            {todo.title} ({todo.priority}){" "}
            {todo.dueDate && `- Due: ${todo.dueDate}`}
          </span>
          <div className="todo-actions-wrapper">
            <div className="todo-actions">
              {!todo.completed && (
                <>
                  <button
                    onClick={() => {
                      setEditingId(todo.id);
                      setEditText(todo.title);
                      setEditDate(todo.dueDate || "");
                    }}
                  >
                    Edit
                  </button>
                  <button onClick={() => toggleTodo(todo.id)}>Done</button>
                </>
              )}
              <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </li>
  );

  return (
    <div className="todo-list">
      <h3>Active Todos</h3>
      <ul>
        {activeTodos.length ? (
          activeTodos.map(renderTodo)
        ) : (
          <li>No active todos</li>
        )}
      </ul>

      <h3>Completed Todos</h3>
      <ul>
        {completedTodos.length ? (
          completedTodos.map(renderTodo)
        ) : (
          <li>No completed todos</li>
        )}
      </ul>
    </div>
  );
}
