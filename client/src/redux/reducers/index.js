import {combineReducers} from 'redux';

import {diagramsReducer} from './diagrams';

export default combineReducers({
    diagram: diagramsReducer,
});
