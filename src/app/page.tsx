'use client';

import { useState, useEffect } from "react";
import { fetchTodos, updateTodo } from "../services/api";
import TodoList from "@/components/TodoList";
import { Todo } from "../types";
import { sortTodos } from "../utils/sortTodos";

const Home = () => {
  const [todos, setTodos] = useState<Todo[]>([]); // State to store the list of todos
  const [isLoading, setIsLoading] = useState(true); // State to track loading

  // FETCH - Get todos when the component mounts
  useEffect(() => {
    const loadTodos = async () => {
      try {
        setIsLoading(true); // Set loading state to true before fetching data
        const data = await fetchTodos(); // Fetch the list of todos from the API
        setTodos(sortTodos(data)); // Sort and store the todos in state
      } catch (error) {
        console.error("Failed to fetch todos:", error); // Handle any errors during the fetch
      } finally {
        setIsLoading(false); // Ensure loading state is reset after fetch attempt
      }
    };

    loadTodos(); // Call the loadTodos function
  }, []); // Empty dependency array ensures this effect runs only once on mount


  // FUNCTION handle the toggle complete action
  const handleToggleComplete = async (id: string, isComplete: boolean) => {
    try {
      await updateTodo(id, { isComplete }); // Update the todo's status on the server
      setTodos((prevTodos) =>
        sortTodos(
          prevTodos.map((todo) =>
            todo.id === id ? { ...todo, isComplete } : todo // Update the state with the modified todo
          )
        )
      );
    } catch (error) {
      console.error("Failed to update todo:", error); // Handle errors during the update
    }
  };

  // Render the TodoList component - if isLoading is true, show the loading animation
  if (isLoading) {
    return (
      <div className="loading-animation-container">
        <div className="loading-wrapper">
          <div className="loading-animation"></div>
          <p className="loading-text">Loading...</p>
        </div>
      </div>
    );
  }  

  return (
    <div>
      <div className="todo-app-title-container">
      <h1 className="todo-app-title">📝 Todo App</h1>
      </div>
      <TodoList todos={todos} onToggleComplete={handleToggleComplete} />
    </div>
  );
};

export default Home;
