import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import firebase from "firebase/auth";
interface IFirebase {
  user: firebase.User | null;
}

const initialState: IFirebase = {
  user: null,
}

export const firebaseSlice = createSlice({
  name: 'firebase',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<firebase.User | null>) {
      state.user = action.payload
    },
  },
})

export const { setUser } = firebaseSlice.actions

