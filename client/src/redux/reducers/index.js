import {combineReducers} from 'redux';

import {diagramsReducer} from './diagrams';
import {messagesReducer} from './messages';
import {loginReducer} from './login';
import {authReducer} from './auth';

export default combineReducers({
    diagram: diagramsReducer,
    message: messagesReducer,
    login: loginReducer,
    auth: authReducer,
});
