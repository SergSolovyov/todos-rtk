import React from 'react';
import { ITodo } from "../store/todo/todo.slice";


interface ITodoItemProps {
  todo: ITodo;
  deleteTodo: (todo: ITodo) => void;
  editTodo: (todo: ITodo) => void;
  toggleTodoDone: (todo: ITodo) => void;
}

const TodoItem = ({ todo, editTodo, deleteTodo, toggleTodoDone}: ITodoItemProps) => {

  const handleTodoDelete = () => {
    deleteTodo(todo)
  }
  const handleTodoEdit = () => {
    editTodo(todo)
  }
  const handleToggleTodo = () => {
    toggleTodoDone(todo)
  }

  return (
    <div className='w-full border-2 shadow-md border-gray-300 bg-stone-100 rounded-sm py-4 px-2 mb-1 flex items-start relative'>
      <input className='w-5 h-5 mr-2 cursor-pointer mt-1 shrink-0' onChange={handleToggleTodo} type="checkbox" checked={todo.done} />
      <div className={`${todo.done ? 'line-through' : ''} font-semibold text-lg`}>{todo.title}</div>
      <button className='ml-auto mr-1 rounded-lg bg-yellow-300 px-4 py-1  font-semibold hover:bg-yellow-400 transition-colors border border-stone-400' onClick={handleTodoEdit}>Edit</button>
      <button className='rounded-lg bg-red-400 px-4 py-1 font-semibold hover:bg-red-500 transition-colors border border-stone-400' onClick={handleTodoDelete}>Delete</button>
      <span className='absolute top-0 left-2 text-xs text-stone-600'>{String(new Date(todo.date).toLocaleString())}</span>
    </div>
  );
};

export default TodoItem;
