import {combineReducers} from 'redux';

import {diagramsReducer} from './diagrams';
import {messagesReducer} from './messages';

export default combineReducers({
    diagram: diagramsReducer,
    message: messagesReducer,
});
