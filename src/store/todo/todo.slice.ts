import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuid } from 'uuid';
import { createTodoObg } from "../../utils/createTodoObg";
import { addTodoDb, deleteTodoDb, editTodoDb, getTodosDb, toggleTodoDb } from "../firebase/firebase.actions";

export const LS_TODO_KEY = 'LS_TODO_KEY';

export interface ITodo {
  title: string;
  id: string;
  date: number;
  done: boolean;
}

interface TodoState {
  todos: ITodo[];
}


const initialState: TodoState = {
  todos: JSON.parse(localStorage.getItem(LS_TODO_KEY) ?? '[]'),
}

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo(state, action: PayloadAction<string>) {
      state.todos.push(createTodoObg(action.payload))
      localStorage.setItem(LS_TODO_KEY, JSON.stringify(state.todos))
    },
    deleteTodo(state, action: PayloadAction<string>) {
      state.todos = state.todos.filter(todo => todo.id !== action.payload)
      localStorage.setItem(LS_TODO_KEY, JSON.stringify(state.todos))
    },
    editTodo(state, action: PayloadAction<string>) {
      const currentTodo = state.todos.find(todo => todo.id === action.payload);
      currentTodo!.title = prompt() || currentTodo!.title
      currentTodo!.date = new Date().getTime();
      currentTodo!.done = false;
      localStorage.setItem(LS_TODO_KEY, JSON.stringify(state.todos))
    },
    toggleTodoDone(state, action: PayloadAction<string>) {
      const currentTodo = state.todos.find(todo => todo.id === action.payload);
      currentTodo!.done = !currentTodo?.done
      localStorage.setItem(LS_TODO_KEY, JSON.stringify(state.todos))
    },
    setLocalTodos(state, action: PayloadAction<ITodo[]>) {
      state.todos = action.payload
    }
  },
  extraReducers: {
    [getTodosDb.fulfilled.type]: (state, action: PayloadAction<ITodo[]>) => {
      state.todos = action.payload
    },
  }
})

export const { addTodo, deleteTodo, editTodo, toggleTodoDone, setLocalTodos } = todoSlice.actions;
