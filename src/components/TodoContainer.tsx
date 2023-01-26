import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import TodoItem from "./TodoItem";
import { addTodo, deleteTodo, editTodo, ITodo, toggleTodoDone } from "../store/todo/todo.slice";
import { addTodoDb, deleteTodoDb, editTodoDb, getTodosDb, toggleTodoDb } from "../store/firebase/firebase.actions";

const TodoContainer = () => {
  const todos = useAppSelector(state => state.todo.todos);
  const user = useAppSelector(state => state.firebase.user);
  const [inputValue, setInputValue] = useState<string>('');
  const dispatch = useAppDispatch();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    if (user) {
      dispatch(addTodoDb({ todo: inputValue, user }))
      dispatch(getTodosDb(user))
    } else {
      dispatch(addTodo(inputValue))
    }
    setInputValue('');
  }

  const handleDelete = async (todo: ITodo) => {
    if (user) {
      await dispatch(deleteTodoDb({user, id: todo.id}))
      dispatch(getTodosDb(user))
    } else {
      dispatch(deleteTodo(todo.id))
    }
  }
  const handleEdit = async (todo: ITodo) => {
    if (user) {
      await dispatch(editTodoDb({user, todo}))
      dispatch(getTodosDb(user))
    } else {
      dispatch(editTodo(todo.id))
    }
  }

  const handleToggleTodo = async (todo: ITodo) => {
    if (user) {
      await dispatch(toggleTodoDb({user, todo: todo}))
      dispatch(getTodosDb(user))
    } else {
      dispatch(toggleTodoDone(todo.id))
    }
  }

  return (
    <div className='w-[100%] sm:w-[80%] mx-auto px-4'>
      <form className='h-[40px] flex mx-auto mt-3 rounded-md shadow-md overflow-hidden mb-1' action="#" onSubmit={handleSubmit}>
        <input className='grow rounded-l-md' type="text" value={inputValue} onChange={e => setInputValue(e.target.value)}/>
        <button className='px-2 bg-green-300 font-semibold hover:bg-green-400 transition-colors rounded-r-md'>Add Todo</button>
      </form>

      {!todos.length && <div>No todos</div>}
      {todos.length > 0 && todos.map(todo =>
        <TodoItem key={todo.id} todo={todo} deleteTodo={handleDelete} editTodo={handleEdit} toggleTodoDone={handleToggleTodo} />
      )}
    </div>
  );
};

export default TodoContainer;
