import {
  configureStore,
  type Action,
  type ThunkAction
} from '@reduxjs/toolkit';
import {
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector,
  type TypedUseSelectorHook,
} from 'react-redux';
import { taskSlice } from './taskSlice';

export const makeStore = () =>
  configureStore({
    reducer: taskSlice.reducer,
    devTools: true,
});

export const useDispatch = () => useReduxDispatch<AppDispatch>();
export const useSelector: TypedUseSelectorHook<AppState> = useReduxSelector;

/* Types */
export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
export type AppThunkAction<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

const store = makeStore();

export { store };