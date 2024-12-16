import React, { useState } from "react";
import { Todo } from "../types";
import { formatDate } from "@/utils/formatDate";

interface Props {
  todo: Todo;
  onToggleComplete: (id: string, isComplete: boolean, setLoading: (loading: boolean) => void) => void;
}

const TodoItem: React.FC<Props> = ({ todo, onToggleComplete }) => {
  const [isLoading, setIsLoading] = useState(false); // Local loading state for this Todo
  const isOverdue = todo.dueDate && new Date(todo.dueDate) < new Date() && !todo.isComplete;

  const handleToggle = async () => {
    setIsLoading(true); // Show loading animation
    await onToggleComplete(todo.id, !todo.isComplete, setIsLoading);
  };

  return (
    // if todo is overdue, add status-overdue class
    // if todo is complete, add status-complete class
    // else, add status-default class
    <div
    className={`todo-item ${
      isOverdue
        ? 'status-overdue'
        : todo.isComplete
        ? 'status-complete'
        : 'status-default'
    }`}
  >
      <input
        type="checkbox"
        checked={todo.isComplete}
        onChange={handleToggle}
        disabled={isLoading} // Disable interaction while loading
      />
      <span style={{ textDecoration: todo.isComplete ? "line-through" : "none" }} className='description'>
        {todo.description}
      </span>
      {isLoading && (
           // Show spinner while loading
          <span className="update-container">
          <span className="update-animation">⏳</span>
          Please wait...
        </span>
      )}
      {todo.dueDate && (
        <span className={`date ${isOverdue ? 'date-overdue animate-border-flash' : ''}`}>
          {formatDate(todo.dueDate)}
        </span>
      )}
    </div>
  );
};

export default TodoItem;
