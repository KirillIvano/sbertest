import {ofType} from 'redux-observable';
import {of, from} from 'rxjs';
import {
    mergeMap, exhaustMap,
} from 'rxjs/operators';

import {LOGIN_START} from '@/redux/names/login';
import {
    authenticateAction,
    saveTokenAction,
} from '@/redux/actions/auth';
import {
    loginErrorAction,
    loginSuccessAction,
} from '@/redux/actions/login';
import {login} from '@/services/auth';
import {showNormalMessage} from '@/redux/actions/messages';

const loginEpic = action$ =>
    action$.pipe(
        ofType(LOGIN_START),
        exhaustMap(
            ({payload: {body}}) =>
                from(
                    login(body),
                )
                    .pipe(
                        mergeMap(
                            ({ok, error, accessJwt, refreshJwt}) => {
                                if (!ok) {
                                    return of(
                                        loginErrorAction(error),
                                    );
                                }

                                return of(
                                    authenticateAction({accessJwt, refreshJwt}),
                                    showNormalMessage('Вход', 'Вы успешно вошли в систему'),
                                    saveTokenAction(refreshJwt),
                                    loginSuccessAction(),
                                );
                            },
                        ),
                    ),
        ),
    );


export default loginEpic;
