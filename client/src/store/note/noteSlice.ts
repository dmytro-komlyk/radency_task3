import { AppState } from '../store';
import { createSlice, isAnyOf  } from '@reduxjs/toolkit';

import {
  loadNotes,
  loadNotesStats,
  createNote,
  updateNote,
  deleteNote
} from './actions';

export interface INote {
  id: string,
  name: string,
  archived: boolean,
  created: number,
  category: string,
  content: string,
}

export interface IStat {
  category: string,
  archived: number,
  active: number
}

export interface INoteState {
  notes: Array<INote>;
  stats: Array<IStat>,
}

const initialState: INoteState = {
  notes: [],
  stats: [],
};

const noteSlice = createSlice({
  name: 'note',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadNotes.fulfilled, (state, action) => {
      const { notes } = action.payload;
      state.notes = notes;
    });
    builder.addCase(loadNotesStats.fulfilled, (state, action) => {
      const { stats } = action.payload;
      state.stats = stats;
    });
    builder.addCase(createNote.fulfilled, (state, action) => {
      const newNote = action.payload;
      state.notes = [...state.notes, newNote];
      state.stats = state.stats.map((stat) => stat.category === newNote.category ? { ...stat, active: stat.active + 1 } : stat);
    });
    builder.addMatcher(isAnyOf(updateNote.fulfilled, deleteNote.fulfilled), (state, action) => {
      const { updatedNotes, updatedStats } = action.payload;
      state.notes = updatedNotes;
      state.stats = updatedStats;
    });

  }
});

export const selectNotesState = (state: AppState) => state;

export { noteSlice };