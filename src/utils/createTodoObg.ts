import { ITodo } from "../store/todo/todo.slice";
import { v4 as uuid } from "uuid";

export const createTodoObg = (todo: string): ITodo => {
  return {
    title: todo,
    id: uuid(),
    date: new Date().getTime(),
    done: false
  }
}
