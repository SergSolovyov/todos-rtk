import React, { useEffect } from 'react';
import TodoContainer from "./components/TodoContainer";
import Login from "./components/Login";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebase";
import { setUser } from "./store/firebase/firebase.slice";
import { getTodosDb } from "./store/firebase/firebase.actions";
import { LS_TODO_KEY, setLocalTodos } from "./store/todo/todo.slice";

const App = () => {
  const user = useAppSelector(state => state.firebase.user)
  const dispatch = useAppDispatch();


  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      dispatch(setUser(currentUser))
    })

    if (user) {
      dispatch(getTodosDb(user))
    } else {
      dispatch(setLocalTodos(JSON.parse(localStorage.getItem(LS_TODO_KEY) ?? '[]'),))
    }

  }, [user])


  return (
    <div className='min-h-[100vh] bg-gray-200 py-5 px-5'>
      <Login />
      <h1 className='text-2xl font-semibold text-center'>My Todos</h1>
      <TodoContainer  />
    </div>
  );
};

export default App;
