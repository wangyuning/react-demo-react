import { combineReducers } from 'redux-immutable';
import { reducer as headerReducer } from '../common/header/store';
import { reducer as homeRrducer } from '../pages/home/store';

const reducer =  combineReducers({
    header: headerReducer,
    home: homeRrducer
});

export default reducer;
