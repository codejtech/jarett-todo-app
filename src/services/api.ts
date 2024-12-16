import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "X-Api-Key": API_KEY,
  },
});

// GET ALL TODOS
export const fetchTodos = async () => {
  const response = await apiClient.get("/get");
  return response.data;
};

// UPDATE TODO
export const updateTodo = async (id: string, data: { isComplete: boolean }) => {
  const response = await apiClient.patch(`/patch/${id}`, data);
  return response.data;
};

// CREATE NEW TODO
/*export const createTodo = async (todo: Partial<Todo>): Promise<Todo> => {
  const response = await apiClient.post('/todos', todo); // Replace with your actual API endpoint
  return response.data;
};*/
