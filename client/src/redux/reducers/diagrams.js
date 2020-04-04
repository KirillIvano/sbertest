import {
    GET_DIAGRAMS_PREVIEWS,
    GET_DIAGRAMS_PREVIEWS_ERROR,
    GET_DIAGRAMS_PREVIEWS_SUCCESS,

    DELETE_DIAGRAM,
    DELETE_DIAGRAM_SUCCESS,
    DELETE_DIAGRAM_ERROR,
    DELETE_DIAGRAM_FORGET,
} from '@/redux/names/diagrams';

const INITIAL_STATE = {
    diagrams: [],

    diagramsGettingInProgress: false,
    diagramsGettingSuccess: false,
    diagramsGettingError: null,

    diagramDeletingInProgress: false,
    diagramDeletingSuccess: false,
    diagramDeletingError: null,
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

    case DELETE_DIAGRAM: {
        return {
            ...state,
            diagramDeletingInProgress: true,
            diagramDeletingSuccess: false,
            diagramDeletingError: null,
        };
    }
    case DELETE_DIAGRAM_SUCCESS: {
        const {diagrams} = state;
        const {diagramId} = payload;
        const newDiagrams = diagrams.filter(({id}) => id !== diagramId);

        return {
            ...state,
            diagrams: newDiagrams,
            diagramDeletingInProgress: false,
            diagramDeletingSuccess: true,
        };
    }
    case DELETE_DIAGRAM_ERROR: {
        const {error} = payload;
        return {
            ...state,
            diagramDeletingInProgress: true,
            diagramDeletingError: error,
        };
    }
    case DELETE_DIAGRAM_FORGET: {
        return {
            ...state,
            diagramDeletingInProgress: false,
            diagramDeletingSuccess: false,
            diagramDeletingError: null,
        };
    }
    default: {
        return state;
    }
    }
};
