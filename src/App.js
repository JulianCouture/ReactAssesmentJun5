import { useState, useEffect } from "react";
import "./App.css";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import TodoStats from "./components/TodoStats";

function App() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });
  const [filter, setFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [sortBy, setSortBy] = useState("createdAt");

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Add new todo
  const addTodo = (todo) => {
    setTodos([
      ...todos,
      {
        ...todo,
        id: Date.now(),
        completed: false,
        createdAt: new Date().toISOString(),
      },
    ]);
  };

  // Toggle completion status
  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Delete todo
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // Edit todo
  const editTodo = (id, newTitle, newDate) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, title: newTitle, dueDate: newDate } : todo
      )
    );
  };

  // Apply filtering and sorting to todos
  const getFilteredTodos = () => {
    let filtered = todos;

    if (filter === "active") {
      filtered = todos.filter((todo) => !todo.completed);
    } else if (filter === "completed") {
      filtered = todos.filter((todo) => todo.completed);
    }

    filtered = filtered.filter((todo) => {
      if (priorityFilter !== "all") return todo.priority === priorityFilter;
      return true;
    });

    filtered.sort((a, b) => {
      if (sortBy === "priority") {
        const priorityValues = { Low: 1, Medium: 2, High: 3 };
        return priorityValues[b.priority] - priorityValues[a.priority];
      }
      if (sortBy === "dueDate") {
        return (
          new Date(a.dueDate || Infinity) - new Date(b.dueDate || Infinity)
        );
      }
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    return filtered;
  };

  return (
    <div className="App">
      <h1>Todo App</h1>

      {/* Filter and Sort Controls */}
      <div className="controls">
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>

        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
        >
          <option value="all">All Priorities</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="createdAt">Sort by Created</option>
          <option value="dueDate">Sort by Due Date</option>
          <option value="priority">Sort by Priority</option>
        </select>
      </div>

      {/* Components */}
      <TodoStats todos={todos} />
      <TodoForm addTodo={addTodo} />
      <TodoList
        todos={getFilteredTodos()}
        toggleTodo={toggleTodo}
        deleteTodo={deleteTodo}
        editTodo={editTodo}
      />
    </div>
  );
}

export default App;
