import { createAsyncThunk } from "@reduxjs/toolkit";
import { query, collection, getDocs, doc, addDoc, deleteDoc, where, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase/firebase';
import { ITodo } from "../todo/todo.slice";
import firebase from "firebase/auth";
import { createTodoObg } from "../../utils/createTodoObg";


export const getTodosDb = createAsyncThunk(
  'getTodosDb',
async (user: firebase.User, thunkApi) => {
    try {
      const todos: ITodo[] = [];

      if (user) {
        const q = query(collection(db, user.uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          todos.push(doc.data() as ITodo)
        });
      }
      todos.sort((a, b) => a.date - b.date)
      return todos
    } catch (e) {
      return thunkApi.rejectWithValue(e)
    }
  }
)

export const addTodoDb = createAsyncThunk(
  'addTodoDb',
  async ({ todo, user }: { todo: string; user: firebase.User }, thunkAPI) => {
    try {
     await addDoc(collection(db, user.uid), createTodoObg(todo));
    } catch (e) {
      return thunkAPI.rejectWithValue(e)
    }
  }
)

export const deleteTodoDb = createAsyncThunk(
  'deleteTodoDb',
  async ({ user, id }: { user: firebase.User; id: string }, thunkAPI) => {
    try {
      const q = query(collection(db, user.uid), where("id", "==", id));
      await getDocs(q)
        .then(todos => todos.forEach(todo => deleteDoc(doc(db, user.uid, todo.id))));
    } catch (e) {
      return thunkAPI.rejectWithValue(e)
    }
  }
)

export const toggleTodoDb = createAsyncThunk(
  'toggleTodoDb',
  async ({ user, todo }: { user: firebase.User; todo: ITodo }, thunkAPI) => {
    try {
      const q = query(collection(db, user.uid), where("id", "==", todo.id));
      await getDocs(q)
        .then(todos => todos.forEach(async todoCurrent => {
          const ref = doc(db, user.uid, todoCurrent.id)
          await updateDoc(ref, {
            done: !todo.done
          })
        }));
    } catch (e) {
      return thunkAPI.rejectWithValue(e)
    }
  }
)

export const editTodoDb = createAsyncThunk(
  'editTodoDb',
  async ({ user, todo }: { user: firebase.User; todo: ITodo }, thunkAPI) => {
    try {
      const q = query(collection(db, user.uid), where("id", "==", todo.id));
      await getDocs(q)
        .then(todos => todos.forEach(async todoCurrent => {
          const ref = doc(db, user.uid, todoCurrent.id)
          await updateDoc(ref, {
            title: prompt() || todo.title,
            date: new Date().getTime(),
            done: false
          })
        }));
    } catch (e) {
      return thunkAPI.rejectWithValue(e)
    }
  }
)
