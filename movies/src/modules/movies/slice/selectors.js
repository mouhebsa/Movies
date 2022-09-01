import { createSelector } from '@reduxjs/toolkit';
import { initialState } from '.';

const selectSlice = state => state.movies || initialState;

const selectMovies = createSelector([selectSlice], state => state);

export const selectMoviesObject = createSelector(
  [selectMovies],
  state => state.movies,
);