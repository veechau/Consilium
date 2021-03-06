"use strict";

const Dispatcher = require('../dispatcher/dispatcher');
const MovieConstants = require('../constants/movie_constants');
const MovieApiUtil = require('../util/movie_api_util');

const MovieActions = {

  skipMovie(movieId) {
    Dispatcher.dispatch({
      actionType: MovieConstants.SKIP_MOVIE,
      movieId: movieId
    });
  },

  fetchPopularMovies() {
    MovieApiUtil.fetchPopularMovies(
      MovieActions.receivePopularMovies);
  },

  fetchRecommendedMovies(ratedMovies, queuedMovies) {
    MovieApiUtil.fetchRecommendedMovies(
      ratedMovies,
      queuedMovies,
      MovieActions.receiveRecommendedMovies
    );
  },

  receiveRecommendedMovies(movies) {
    Dispatcher.dispatch({
      actionType: MovieConstants.RECOMMENDED_MOVIES_RECEIVED,
      movies: movies
    });
  },

  receivePopularMovies(movies){
    Dispatcher.dispatch({
      actionType: MovieConstants.POPULAR_MOVIES_RECEIVED,
      movies: movies
    });
  }

};

module.exports = MovieActions;
