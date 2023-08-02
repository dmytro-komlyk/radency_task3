import { createAsyncThunk } from '@reduxjs/toolkit';
import { note } from '../../services/services';
import { ActionType } from './common';
import { INote, IStat } from './noteSlice';

const loadNotes = createAsyncThunk(
  ActionType.SET_ALL_NOTES,
  async (filter: object, thunkApi) => {
    try {
      const { notes } = await note.getAllNotes(filter);
      return { notes };
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

const loadNotesStats = createAsyncThunk(
  ActionType.SET_NOTES_STATS,
  async (obj, thunkApi) => {
    try {
      const { stats } = await note.getNotesStats();
      return { stats };
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

const createNote = createAsyncThunk(
  ActionType.ADD_NOTE,
  async (payload: object, thunkApi) => {
    try {
      const { id } = await note.addNote(payload);
      const newNote = await note.getNote(id);
      return newNote;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

const updateNote = createAsyncThunk(
  ActionType.UPDATE_NOTE,
  async (payload: { id: string; data: object }, thunkApi) => {
    try {
      const { id } = await note.updateNote(payload);
      const updatedNote = await note.getNote(id);
      const { notes, stats } = thunkApi.getState() as { notes: INote[], stats: IStat[] };
      const updatedNotes = notes.map((note) => note.id === updatedNote.id ? updatedNote : note);
      const updatedStats = stats.map((stat) => {
        const updatedActiveNotes = updatedNotes.filter((note) => !note.archived && note.category === stat.category) ;
        const updatedArchivedNotes = updatedNotes.filter((note) => note.archived && note.category === stat.category);
        return { ...stat, active: updatedActiveNotes.length, archived: updatedArchivedNotes.length }
      });
      return { updatedNotes, updatedStats };
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

const deleteNote = createAsyncThunk(
  ActionType.REMOVE_NOTE,
  async (id: string, thunkApi) => {
    try {
      const { id: removedNoteId } = await note.removeNote(id);
      const { notes, stats } = thunkApi.getState() as { notes: INote[], stats: IStat[] };
      const removedNote = notes.find((note) => note.id === removedNoteId);
      const updatedNotes = removedNoteId ? notes.filter((note) => note.id !== removedNoteId) : notes;
      const updatedStats = stats.map((stat) => stat.category === removedNote?.category ? { ...stat, active: stat.active - 1 } : stat);
      return { updatedNotes, updatedStats };
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export { createNote, deleteNote, loadNotes, loadNotesStats, updateNote };