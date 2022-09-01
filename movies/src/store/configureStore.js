import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import moviesReducer from '../modules/movies/slice';

import { rootSaga } from './rootSaga';

export function configueAppStore() {
  const sagaMiddleware = createSagaMiddleware();

  const middlewares = [sagaMiddleware];

  const store = configureStore({
    reducer: {
      movies: moviesReducer
    },
    middleware: [...middlewares],
  });

  sagaMiddleware.run(rootSaga);

  return store;
}
