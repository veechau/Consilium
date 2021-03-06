const React = require('react');
const Loader = require('react-loader');
const GaugeIndex = require('./gauge_index');
const RatedIndex = require('./rated_index');
const RecommendationIndex = require('./recommendation_index');
const MovieRatingStore = require('../stores/movie_rating_store');
const MovieStore = require('../stores/movie_store');
const MovieActions = require('../actions/movie_actions');

const MovieRecommender = React.createClass({

  getInitialState() {
    return {isRecommending: false};
  },

  componentDidMount(){
    this.movieRatingListener = MovieRatingStore.addListener(this.ratingsOnChange);
    this.movieStoreListener = MovieStore.addListener(this.moviesOnChange);
  },

  moviesOnChange() {
  },

  ratingsOnChange() {
    let ratedMovies = MovieRatingStore.getRatings();
    let queue = MovieStore.getQueue();
    console.log(`Number of rated movies: ${Object.keys(ratedMovies).length}`);
    if (Object.keys(ratedMovies).length === 10) {
      MovieActions.fetchRecommendedMovies(ratedMovies, queue);
      this.setState({isRecommending: true});
    }
  },

  renderIndex() {
    if (this.state.isRecommending) {
      return (
        <div className="recommender">
          <RecommendationIndex/>
          <RatedIndex/>
        </div>
      );
    } else {
      return (
        <div className="recommender">
          <GaugeIndex/>
          <RatedIndex/>
        </div>
      );
    }
  },

  render() {
    return this.renderIndex();
  }
});

module.exports = MovieRecommender;
