import {combineEpics} from 'redux-observable';

import diagramsEpic from './diagrams';

export default combineEpics(diagramsEpic);
