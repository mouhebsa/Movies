import { put, takeLatest } from "redux-saga/effects";
import { moviesActions as actions } from ".";
import { movies$ } from "../../../utils/movies";

export function* getAllMovies(action) {
  try {
    const moviesList = yield movies$;
     yield put(actions.getMoviesSucccess(moviesList));
  } catch (err) {
    yield put(actions.getMoviesError(err));
  }
}

export function* setPagination(action) {
    yield put(actions.setpageSuccess(action.payload));
}

export function* deleteMovie(action) {
  yield put(actions.deleteMovieSucccess(action.payload));
}

export function* addLike(action) {
  yield put(actions.AddLikeSuccess(action.payload));
}

export function* addDislike(action) {
  yield put(actions.AddDisLikeSuccess(action.payload));
}

export function* addCategory(action) {
  yield put(actions.addCategorySucccess(action.payload));
}

export function* moviesSagaWatcher() {
  yield takeLatest(actions.getMovies.type, getAllMovies);
  yield takeLatest(actions.setPage.type, setPagination);
  yield takeLatest(actions.deleteMovie.type, deleteMovie);
  yield takeLatest(actions.addLike.type, addLike);
  yield takeLatest(actions.addDisLike.type, addDislike);
  yield takeLatest(actions.addCategory.type, addCategory);
}
