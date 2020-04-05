import {
    ofType,
    combineEpics,
} from 'redux-observable';
import {of, from} from 'rxjs';
import {
    tap,
    exhaustMap,
    mergeMap,
} from 'rxjs/operators';
import {
    SAVE_TOKEN,
    WITH_AUTHENTICATION,
    APP_START_AUTH,
} from '@/redux/names/auth';
import {getJwtPayload, isTokenExpired} from '@/helpers/jwt';
import {
    selectRefreshJwt,
    selectAccessJwt,
} from '@/redux/selectors/auth';
import {
    authenticateAction,
    saveTokenAction,
    appStartAuthErrorAction,
    appStartAuthSuccessAction,
    refreshTokensError,
} from '@/redux/actions/auth';
import {
    saveToken,
    getLocalToken,
    refreshTokens,
} from '@/services/auth';

import {loginForgetAction} from '@/redux/actions/login';
import {showErrorMessage} from '@/redux/actions/messages';
import {emptyAction} from '@/redux/actions/empty';

const refreshTokenObservable = csrf => {
    const body = {csrf};
    const req = refreshTokens(body);

    return from(req);
};

const appStartAuthEpic =
    action$ =>
        action$.pipe(
            ofType(APP_START_AUTH),
            exhaustMap(() => {
                const refreshJwt = getLocalToken();

                if (!refreshJwt || isTokenExpired(refreshJwt)) {
                    return of(
                        appStartAuthErrorAction(),
                    );
                }

                const {csrf} = getJwtPayload(refreshJwt);

                return refreshTokenObservable(csrf).pipe(
                    mergeMap(
                        ({ok, error, accessJwt, refreshJwt}) => {
                            if (!ok) {
                                return of(
                                    showErrorMessage('Вход', error),
                                    appStartAuthErrorAction(),
                                );
                            }

                            return of(
                                authenticateAction({accessJwt, refreshJwt}),
                                saveTokenAction(refreshJwt),
                                appStartAuthSuccessAction(),
                            );
                        },
                    ),
                );
            }),
        );

const saveTokenEpic =
    action$ =>
        action$.pipe(
            ofType(SAVE_TOKEN),
            tap(({payload}) => {
                const {refreshJwt} = payload;

                saveToken(refreshJwt);
            }),
            mergeMap(() => of(emptyAction())),
        );

const withAuthenticationEpic =
    (action$, state$) =>
        action$.pipe(
            ofType(WITH_AUTHENTICATION),
            mergeMap(({action}) => {
                const state = state$.value;

                const accessToken = selectAccessJwt(state);

                if (accessToken) {
                    const accessTokenPayload = getJwtPayload(accessToken);
                    if (accessTokenPayload.exp > Date.now() / 1000) return of({...action, accessToken});
                }

                const refreshToken = selectRefreshJwt(state);

                if (!refreshToken) {
                    return of(
                        loginForgetAction(),
                        refreshTokensError(),
                    );
                }

                const refreshTokenPayload = getJwtPayload(refreshToken);
                const {csrf} = refreshTokenPayload;

                if (refreshTokenPayload.exp > Date.now() / 1000) {
                    return refreshTokenObservable(csrf).pipe(
                        mergeMap(
                            ({ok, accessJwt, refreshJwt}) => {
                                if (!ok) {
                                    return of(
                                        loginForgetAction(),
                                        refreshTokensError(),
                                    );
                                }

                                return of(
                                    authenticateAction({accessJwt, refreshJwt}),
                                    {...action, accessToken},
                                );
                            },
                        ),
                    );
                }
            }),
        );

export default combineEpics(
    appStartAuthEpic,
    saveTokenEpic,
    withAuthenticationEpic,
);
