import { AppState } from './store';
import { createSlice } from '@reduxjs/toolkit';
import uniqueId from 'lodash/uniqueId';

const mockTasks = [
  { id: uniqueId(), name: 'Shopping list', archived: false, created: Date.now(), category: 'Task', content: 'Tomatoes, bread' },
  { id: uniqueId(), name: 'New Feature', archived: false, created: Date.now(), category: 'Task', content: 'I’m gonna have a dentist appointment on the 3/5/2021, I moved it from 5/5/2021' },
  { id: uniqueId(), name: 'William Gaddis', archived: false, created: Date.now(), category: 'Quote', content: 'Power doesnt content' },
]

export interface ITask {
  id: string,
  name: string,
  archived: boolean,
  created: number,
  category: string,
  content: string,
}

export interface ITaskInfo {
  category: string,
  archived: number,
  active: number
}

export interface ITaskState {
  tasks: Array<ITask>;
}

const initialState: ITaskState = {
  tasks: [...mockTasks],
};

const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
      addTask: (state, action) => {
        const { payload: { ...restData } } = action
        const newTask = {
          id: uniqueId(),
          archived: false,
          created: Date.now(),
          ...restData,
        };
        state.tasks.push(newTask);
      },
      editTask: (state, action) => {
        const { payload: { id, data } } = action;
        state.tasks = state.tasks.map((task) => task.id === id ? { ...task, ...data } : task )
      },
      removeTask: (state, action) => {
        state.tasks = state.tasks.filter((task => task.id !== action.payload.id));
      },
      archiveTask: (state, action) => {
        state.tasks = state.tasks.map((task) => task.id === action.payload.id ? { ...task, archived: true } : task)
      },
      unarchiveTask: (state, action) => {
        state.tasks = state.tasks.map((task) => task.id === action.payload.id ? { ...task, archived: false } : task)
      }
    },
    
});

export const { addTask, editTask, removeTask, archiveTask, unarchiveTask } = taskSlice.actions

export const selectTasksState = (state: AppState) => state.tasks;

export { taskSlice };