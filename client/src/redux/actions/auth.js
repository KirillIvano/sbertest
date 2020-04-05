import {
    AUTHENTICATE,

    SAVE_TOKEN,

    APP_START_AUTH,
    APP_START_AUTH_ERROR,
    APP_START_AUTH_SUCCESS,

    REFRESH_TOKENS_ERROR,
    REFRESH_TOKENS_ERROR_HANDLED,

    UNLOGIN,
} from '@/redux/names/auth';

export const authenticateAction = ({
    accessJwt,
    refreshJwt,
}) => ({
    type: AUTHENTICATE,
    payload: {
        accessJwt,
        refreshJwt,
    },
});

export const saveTokenAction = refreshJwt => ({
    type: SAVE_TOKEN,
    payload: {
        refreshJwt,
    },
});

export const refreshTokensError = () => ({
    type: REFRESH_TOKENS_ERROR,
});

export const refreshTokensErrorEnd = () => ({
    type: REFRESH_TOKENS_ERROR_HANDLED,
});

export const appStartAuthAction = () => ({
    type: APP_START_AUTH,
});

export const appStartAuthErrorAction = () => ({
    type: APP_START_AUTH_ERROR,
});

export const appStartAuthSuccessAction = () => ({
    type: APP_START_AUTH_SUCCESS,
});

export const unloginAction = () => ({
    type: UNLOGIN,
});
