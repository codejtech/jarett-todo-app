import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTodo } from '../services/api';

const CreateTodo: React.FC = () => {
  const queryClient = useQueryClient();
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState<string | null>(null);

  const mutation = useMutation(createTodo, {
    onSuccess: () => {
      // Refresh todos after successfully adding a new one
      queryClient.invalidateQueries(['todos']);
      setDescription('');
      setDueDate(null);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Ensure the description is not empty
    if (description.trim()) {
      mutation.mutate({
        description,
        dueDate, // If dueDate is an empty string, set it to null
        isComplete: false,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      {/* Task Description */}
      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Task Description
        </label>
        <input
          id="description"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          required
        />
      </div>

      {/* Due Date */}
      <div className="mb-4">
        <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">
          Due Date
        </label>
        <input
          id="dueDate"
          type="date"
          value={dueDate || ''}
          onChange={(e) => setDueDate(e.target.value || null)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        disabled={mutation.isLoading}
      >
        {mutation.isLoading ? 'Adding...' : 'Add Todo'}
      </button>
    </form>
  );
};

export default CreateTodo;
