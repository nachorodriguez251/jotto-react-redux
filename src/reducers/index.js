import { combineReducers } from 'redux';
import success from './successReducer';
import guessedWord from './guessedWordReducer';

export default combineReducers({
  success,
  guessedWord,
});