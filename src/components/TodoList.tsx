import React from "react";
import TodoItem from "./TodoItem";
import { Todo } from "../types";

interface Props {
  todos: Todo[];
  onToggleComplete: (id: string, isComplete: boolean, setLoading: (loading: boolean) => void) => void;
}

const TodoList: React.FC<Props> = ({ todos, onToggleComplete }) => {
  return (
    <div className='todo-list-container'>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onToggleComplete={onToggleComplete}
        />
      ))}
    </div>
  );
};

export default TodoList;
