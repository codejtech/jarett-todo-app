import React from "react";
import { Todo } from "../types";
import { formatDate } from "@/utils/formatDate";

interface Props {
  todo: Todo;
  onToggleComplete: (id: string, isComplete: boolean) => void;
}

const TodoItem: React.FC<Props> = ({ todo, onToggleComplete }) => {
  const isOverdue = todo.dueDate && new Date(todo.dueDate) < new Date() && !todo.isComplete;

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
        onChange={() => onToggleComplete(todo.id, !todo.isComplete)}
      />
      <span style={{ textDecoration: todo.isComplete ? "line-through" : "none" }} className='description'>
        {todo.description}
      </span>
      {todo.dueDate && (
        <span className={`date ${isOverdue ? 'date-overdue animate-border-flash' : ''}`}>
          {formatDate(todo.dueDate)}
        </span>
      )}
    </div>
  );
};

export default TodoItem;
