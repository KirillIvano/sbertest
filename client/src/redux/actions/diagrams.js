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

    SAVE_DIAGRAM,
    SAVE_DIAGRAM_SUCCESS,
    SAVE_DIAGRAM_ERROR,

    SELECT_DIAGRAM,
    GET_DIAGRAM_FILE_SUCCESS,
    GET_DIAGRAM_FILE_ERROR,
} from '@/redux/names/diagrams';

export const getDiagramsPreviewsAction = () => ({
    type: GET_DIAGRAMS_PREVIEWS,
});
export const getDiagramsPreviewsSuccessAction = diagrams => ({
    type: GET_DIAGRAMS_PREVIEWS_SUCCESS,
    payload: {
        diagrams,
    },
});
export const getDiagramsPreviewsErrorAction = error => ({
    type: GET_DIAGRAMS_PREVIEWS_ERROR,
    payload: {
        error,
    },
});

export const deleteDiagramAction = diagramId => ({
    type: DELETE_DIAGRAM,
    payload: {
        diagramId,
    },
});
export const deleteDiagramSuccessAction = diagramId => ({
    type: DELETE_DIAGRAM_SUCCESS,
    payload: {
        diagramId,
    },
});
export const deleteDiagramErrorAction = error => ({
    type: DELETE_DIAGRAM_ERROR,
    payload: {
        error,
    },
});

export const createDiagramAction = name => ({
    type: CREATE_DIAGRAM,
    payload: {
        name,
    },
});
export const createDiagramSuccessAction = diagram => ({
    type: CREATE_DIAGRAM_SUCCESS,
    payload: {
        diagram,
    },
});
export const createDiagramErrorAction = error => ({
    type: CREATE_DIAGRAM_ERROR,
    payload: {
        error,
    },
});

export const saveDiagramAction = (diagramId, xmlContent) => ({
    type: SAVE_DIAGRAM,
    payload: {
        diagramId,
        xmlContent,
    },
});
export const saveDiagramSuccessAction = (diagramId, xmlContent) => ({
    type: SAVE_DIAGRAM_SUCCESS,
    payload: {
        diagramId,
        xmlContent,
    },
});
export const saveDiagramError = error => ({
    type: SAVE_DIAGRAM_ERROR,
    payload: {
        error,
    },
});

export const selectDiagramAction = diagramId => ({
    type: SELECT_DIAGRAM,
    payload: {
        diagramId,
    },
});
export const getDiagramFileSuccessAction = (diagramId, xml) => ({
    type: GET_DIAGRAM_FILE_SUCCESS,
    payload: {
        diagramId,
        xml,
    },
});
export const getDiagramFileErrorAction = () => ({
    type: GET_DIAGRAM_FILE_ERROR,
});
