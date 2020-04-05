import {combineEpics} from 'redux-observable';

import diagramsEpic from './diagrams';
import messagesEpic from './messages';
import authEpic from './auth';
import loginEpic from './login';

export default combineEpics(diagramsEpic, messagesEpic, loginEpic, authEpic);
