import { configureStore } from "@reduxjs/toolkit";
import { todoSlice } from "./todo/todo.slice";
import { firebaseSlice } from "./firebase/firebase.slice";

export const store = configureStore({
  reducer: {
    todo: todoSlice.reducer,
    firebase: firebaseSlice.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({serializableCheck: false})
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
