/* eslint-disable no-self-assign */
import { createSlice } from "@reduxjs/toolkit";
import { message } from "antd";

export const initialState = {
  movies: {
    loading: "idle",
    list: [],
    listPerPage: [],
    categories: [],
    selectedCategpries: [],
    error: null,
    loadingDelete: "idle",
    loadingUpdate: "idle",
    page: 0,
    total: 0,
    rowsPerpage: 4,
    totalLikes: 0,
    totalDisplike: 0,
    like: [],
    dislike: [],
  },
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    getMovies(state, action) {
      state.movies.loading = "loading";
    },
    getMoviesSucccess(state, action) {
      const moviesList = Object.assign(action.payload, {});
      let like = 0;
      let dislike = 0;
      moviesList.forEach((elem) => {
        like += elem.likes;
        state.movies.categories.push(elem.category);
        dislike += elem.dislikes;
      });
      state.movies.categories = [...new Set(state.movies.categories)];
      state.movies.loading = "loaded";
      state.movies.listPerPage = [];
      state.movies.totalLikes = like;
      state.movies.totalDisplike = dislike;
      state.movies.list = action.payload;
      state.movies.total = action.payload.length;
      state.movies.listPerPage = moviesList
        .filter(
          (key) =>
            state.movies.selectedCategpries.length === 0 ||
            state.movies.selectedCategpries.includes(key.category)
        )
        .slice(
          state.movies.page * state.movies.rowsPerpage,
          state.movies.rowsPerpage + state.movies.page * 4
        );
    },
    getMoviesError(state, action) {
      state.movies.loading = "error";
      state.movies.list = action.payload;
    },
    setPage(state, action) {},
    setpageSuccess(state, action) {
      const moviesList = Object.assign(state.movies.list, {});
      state.movies.page = action.payload.page;
      state.movies.rowsPerpage = action.payload.rowsPerpage;
      state.movies.listPerPage = moviesList
        .filter(
          (key) =>
            state.movies.selectedCategpries.length === 0 ||
            state.movies.selectedCategpries.includes(key.category)
        )
        .slice(
          action.payload.page * state.movies.rowsPerpage,
          action.payload.rowsPerpage + state.movies.page * 4
        );
    },
    deleteMovie(state, action) {
      state.movies.loading = "loading";
    },
    deleteMovieSucccess(state, action) {
      const index = state.movies.list.findIndex(
        (key) => key.id === action.payload
      );
      state.movies.list.splice(index, 1);
      const moviesList = Object.assign(state.movies.list, {});
      let like = 0;
      let dislike = 0;
      moviesList.forEach((elem) => {
        like += elem.likes;
        state.movies.categories.push(elem.category);
        dislike += elem.dislikes;
      });
      state.movies.categories = [...new Set(state.movies.categories)];
      state.movies.loading = "loaded";
      state.movies.totalLikes = like;
      state.movies.totalDisplike = dislike;
      state.movies.list = state.movies.list;
      state.movies.total = state.movies.list.filter(
        (key) =>
          state.movies.selectedCategpries.length === 0 ||
          state.movies.selectedCategpries.includes(key.category)
      ).length;
      state.movies.listPerPage = moviesList
        .filter(
          (key) =>
            state.movies.selectedCategpries.length === 0 ||
            state.movies.selectedCategpries.includes(key.category)
        )
        .slice(
          state.movies.page * state.movies.rowsPerpage,
          state.movies.rowsPerpage + state.movies.page * 4
        );
      message.success("film supprimer avec succéss");
    },
    addCategory(state, action) {
      state.movies.loading = "loading";
    },
    addCategorySucccess(state, action) {
      state.movies.selectedCategpries = action.payload;
      state.movies.loading = "loaded";

      state.movies.listPerPage = state.movies.list
        .filter(
          (key) =>
            action.payload.length === 0 || action.payload.includes(key.category)
        )
        .slice(
          state.movies.page * state.movies.rowsPerpage,
          state.movies.rowsPerpage + state.movies.page * 4
        );
      state.movies.total = state.movies.list.filter(
        (key) =>
          action.payload.length === 0 || action.payload.includes(key.category)
      ).length;
    },
    addLike(state, action) {},
    AddLikeSuccess(state, action) {
      const index = state.movies.like.findIndex(
        (key) => key === action.payload
      );
      if (index === -1) {
        state.movies.list = state.movies.list.map((elem) =>
          elem.id === action.payload ? { ...elem, likes: elem.likes + 1 } : elem
        );
        state.movies.like.push(action.payload);
        let like = 0;
        state.movies.list.forEach((elem) => {
          like += elem.likes;
        });
        state.movies.totalLikes = like;
      } else {
        state.movies.list = state.movies.list.map((elem) =>
          elem.id === action.payload ? { ...elem, likes: elem.likes - 1 } : elem
        );
        state.movies.like = state.movies.like.filter(
          (key) => key !== action.payload
        );
        let like = 0;
        state.movies.list.forEach((elem) => {
          like += elem.likes;
        });
        state.movies.totalLikes = like;
      }
    },
    addDisLike(state, action) {},
    AddDisLikeSuccess(state, action) {
      const index = state.movies.dislike.findIndex(
        (key) => key === action.payload
      );
      if (index === -1) {
        state.movies.list = state.movies.list.map((elem) =>
          elem.id === action.payload
            ? { ...elem, dislikes: elem.dislikes + 1 }
            : elem
        );
        state.movies.dislike.push(action.payload);
        let dislike = 0;
        state.movies.list.forEach((elem) => {
          dislike += elem.dislikes;
        });
        state.movies.totalLikes = dislike;
      } else {
        state.movies.list = state.movies.list.map((elem) =>
          elem.id === action.payload
            ? { ...elem, likes: elem.dislikes - 1 }
            : elem
        );
        state.movies.dislike = state.movies.dislike.filter(
          (key) => key !== action.payload
        );
        let dislike = 0;
        state.movies.list.forEach((elem) => {
          dislike += elem.dislikes;
        });
        state.movies.totalLikes = dislike;
      }
    },
  },
});

export const { actions: moviesActions } = moviesSlice;

export default moviesSlice.reducer;
