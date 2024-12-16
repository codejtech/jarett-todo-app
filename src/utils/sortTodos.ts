import { Todo } from '../types';

export const sortTodos = (todos: Todo[]): Todo[] => {
  const now = new Date();

  const isOverdue = (todo: Todo) =>
    todo.dueDate && new Date(todo.dueDate) < now && !todo.isComplete;

  const hasDueDate = (todo: Todo) => Boolean(todo.dueDate);

  return todos.sort((a, b) => {
    // 1. Completed items - Position bottom
    if (a.isComplete && !b.isComplete) return 1;
    if (b.isComplete && !a.isComplete) return -1;

    // 2. Overdue items - Position top
    if (isOverdue(a) && !isOverdue(b)) return -1;
    if (isOverdue(b) && !isOverdue(a)) return 1;

    // 3. Sort by due date (due soonest - Position top)
    if (hasDueDate(a) && hasDueDate(b)) {
      return new Date(a.dueDate!).getTime() - new Date(b.dueDate!).getTime();
    }
    if (hasDueDate(a)) return -1;
    if (hasDueDate(b)) return 1;

    // 4. Tasks without due dates come last (if both are incomplete and not overdue)
    return 0;
  });
};
