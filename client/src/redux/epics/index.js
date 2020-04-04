import {combineEpics} from 'redux-observable';

import diagramsEpic from './diagrams';
import messagesEpic from './messages';

export default combineEpics(diagramsEpic, messagesEpic);
