import {
    GET_DIAGRAMS_PREVIEWS,
    GET_DIAGRAMS_PREVIEWS_ERROR,
    GET_DIAGRAMS_PREVIEWS_SUCCESS,

    DELETE_DIAGRAM,
    DELETE_DIAGRAM_SUCCESS,
    DELETE_DIAGRAM_ERROR,

    CREATE_DIAGRAM,
    CREATE_DIAGRAM_SUCCESS,
    CREATE_DIAGRAM_ERROR,
} from '@/redux/names/diagrams';

const INITIAL_STATE = {
    diagrams: [],

    diagramsGettingInProgress: false,
    diagramsGettingSuccess: false,
    diagramsGettingError: null,

    diagramDeletingInProgress: false,
    diagramDeletingSuccess: false,
    diagramDeletingError: null,

    diagramCreatingInProgress: false,
    diagramCreatingSuccess: false,
    diagramCreatingError: null,
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

    case CREATE_DIAGRAM: {
        return {
            ...state,
            diagramCreatingInProgress: true,
            diagramCreatingSuccess: false,
            diagramCreatingError: null,
        };
    }
    case CREATE_DIAGRAM_SUCCESS: {
        const {diagrams} = state;
        const {diagram} = payload;
        const newDiagrams = [diagram, ...diagrams];

        return {
            ...state,
            diagrams: newDiagrams,
            diagramCreatingInProgress: false,
            diagramCreatingSuccess: true,
        };
    }
    case CREATE_DIAGRAM_ERROR: {
        const {error} = payload;
        return {
            ...state,
            diagramCreatingInProgress: false,
            diagramCreatingError: error,
        };
    }

    default: {
        return state;
    }
    }
};

