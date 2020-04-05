import {
    LOGIN_START,
    LOGIN_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FORGET,
    FORGET_LOGIN_ERROR,
} from '@/redux/names/login';

export const loginStartAction = body => ({
    type: LOGIN_START,
    payload: {
        body,
    },
});

export const loginErrorAction = error => ({
    type: LOGIN_ERROR,
    payload: {
        error,
    },
});

export const loginSuccessAction = () => ({
    type: LOGIN_SUCCESS,
});

export const loginForgetAction = () => ({
    type: LOGIN_FORGET,
});

export const forgetLoginErrorAction = () => ({
    type: FORGET_LOGIN_ERROR,
});
