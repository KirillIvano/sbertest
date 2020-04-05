import {
    LOGIN_START,
    LOGIN_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FORGET,
    FORGET_LOGIN_ERROR,
} from '@/redux/names/login';

const INITIAL_STATE = {
    loading: false,
    success: false,
    error: null,
};

export const loginReducer = (
    state=INITIAL_STATE,
    action,
) => {
    const {type, payload} = action;

    switch (type) {
    case LOGIN_START: {
        if (!state.loading) {
            return {...state, loading: true};
        }
        return state;
    }
    case LOGIN_ERROR: {
        const {error} = payload;
        return {...state, error, success: false, loading: false};
    }
    case LOGIN_SUCCESS: {
        return {...state, error: null, success: true, loading: false};
    }
    case LOGIN_FORGET: {
        return INITIAL_STATE;
    }
    case FORGET_LOGIN_ERROR: {
        return {...state, error: null};
    }
    default: {
        return state;
    }
    }
};
