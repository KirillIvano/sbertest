import {ofType} from 'redux-observable';
import {delay, mapTo} from 'rxjs/operators';

import {PUSH_MESSAGE} from '@/redux/names/messages';
import {removeLastMessage} from '@/redux/actions/messages';

const FADING_TIMEOUT = 3000;

const messageEpic =
    (action$) =>
        action$.pipe(
            ofType(PUSH_MESSAGE),
            delay(FADING_TIMEOUT),
            mapTo(removeLastMessage()),
        );

export default messageEpic;

