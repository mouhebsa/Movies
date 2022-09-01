import { all } from 'redux-saga/effects';
import { moviesSagaWatcher } from '../modules/movies/slice/saga';

export function* rootSaga() {
  yield all([
    moviesSagaWatcher()
  ]);
}
