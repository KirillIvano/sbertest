import {
    GET_DIAGRAMS_PREVIEWS,
    GET_DIAGRAMS_PREVIEWS_ERROR,
    GET_DIAGRAMS_PREVIEWS_SUCCESS,
    GET_DIAGRAMS_PREVIEWS_FORGET,
} from '@/redux/names/diagrams';

const INITIAL_STATE = {
    diagrams: [],

    diagramsGettingInProgress: false,
    diagramsGettingSuccess: false,
    diagramsGettingError: null,
};

export const diagramsReducer = (
    state=INITIAL_STATE,
    action,
) => {
    const {type, payload} = action;

    switch (type) {
    case GET_DIAGRAMS_PREVIEWS: {
        return {
            ...state,
            diagramsGettingInProgress: true,
            diagramsGettingSuccess: false,
            diagramsGettingError: null,
        };
    }
    case GET_DIAGRAMS_PREVIEWS_SUCCESS: {
        const {diagrams} = payload;

        return {
            ...state,
            diagrams,
            diagramsGettingInProgress: false,
            diagramsGettingSuccess: true,
        };
    }
    case GET_DIAGRAMS_PREVIEWS_ERROR: {
        const {error} = payload;
        return {
            ...state,
            diagramsGettingInProgress: true,
            diagramsGettingError: error,
        };
    }
    case GET_DIAGRAMS_PREVIEWS_FORGET: {
        return {
            ...state,
            diagramsGettingInProgress: false,
            diagramsGettingSuccess: false,
            diagramsGettingError: null,
        };
    }
    default: {
        return state;
    }
    }
};
