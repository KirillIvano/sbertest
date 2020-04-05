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

    SELECT_DIAGRAM,
    GET_DIAGRAM_FILE_SUCCESS,
    GET_DIAGRAM_FILE_ERROR,

    SAVE_DIAGRAM,
    SAVE_DIAGRAM_SUCCESS,
    SAVE_DIAGRAM_ERROR,
    RENAME_DIAGRAM,
    RENAME_DIAGRAM_ERROR,
    RENAME_DIAGRAM_SUCCESS,
} from '@/redux/names/diagrams';

const INITIAL_STATE = {
    diagrams: [],

    selectedDiagramId: null,

    diagramsGettingInProgress: false,
    diagramsGettingSuccess: false,
    diagramsGettingError: null,

    diagramDeletingInProgress: false,
    diagramDeletingSuccess: false,
    diagramDeletingError: null,

    diagramCreatingInProgress: false,
    diagramCreatingSuccess: false,
    diagramCreatingError: null,

    diagramRenamingInProgress: false,
    diagramRenamingSuccess: false,
    diagramRenamingError: null,

    diagramFileGettingInProgress: false,
    diagramFileGettingSuccess: false,
    diagramFileGettingError: null,

    diagramSavingInProgress: false,
    diagramSavingSuccess: false,
    diagramSavingError: null,
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

    case RENAME_DIAGRAM: {
        return {
            ...state,
            diagramRenamingInProgress: true,
            diagramRenamingSuccess: false,
            diagramRenamingError: null,
        };
    }
    case RENAME_DIAGRAM_SUCCESS: {
        const {diagram} = payload;
        const diagrams = [...state.diagrams];
        const diagramIndex = diagrams.findIndex(({id}) => id === diagram.id);
        diagrams[diagramIndex] = diagram;

        return {
            ...state,
            diagrams,
            diagramRenamingInProgress: false,
            diagramRenamingSuccess: true,
        };
    }
    case RENAME_DIAGRAM_ERROR: {
        const {error} = payload;

        return {
            ...state,
            diagramRenamingInProgress: false,
            diagramRenamingError: error,
        };

    }

    case SELECT_DIAGRAM: {
        const {diagramId} = payload;
        return {
            ...state,
            selectedDiagramId: diagramId,
            diagramFileGettingInProgress: true,
            diagramFileGettingSuccess: false,
            diagramFileGettingError: false,
        };
    }
    case GET_DIAGRAM_FILE_SUCCESS: {
        const {diagramId, xml} = payload;
        const {diagrams} = state;

        const diagramIndex = diagrams.findIndex(({id}) => diagramId === id);
        diagrams[diagramIndex] = {...diagrams[diagramIndex], file: xml};

        return {
            ...state,
            diagrams: [...diagrams],
            diagramFileGettingInProgress: false,
            diagramFileGettingSuccess: true,
        };
    }
    case GET_DIAGRAM_FILE_ERROR: {
        return {
            ...state,
            diagramFileGettingInProgress: false,
            diagramFileGettingError: true,
        };
    }

    case SAVE_DIAGRAM: {
        return {
            ...state,
            diagramSavingInProgress: true,
            diagramSavingSuccess: false,
            diagramSavingError: null,
        };
    }
    case SAVE_DIAGRAM_SUCCESS: {
        return {
            ...state,
            diagramSavingInProgress: false,
            diagramSavingSuccess: true,
        };
    }
    case SAVE_DIAGRAM_ERROR: {
        const {error} = payload;
        return {
            ...state,
            diagramSavingInProgress: true,
            diagramSavingError: error,
        };
    }

    default: {
        return state;
    }
    }
};

