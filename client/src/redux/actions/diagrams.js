import {
    GET_DIAGRAMS_PREVIEWS,
    GET_DIAGRAMS_PREVIEWS_ERROR,
    GET_DIAGRAMS_PREVIEWS_SUCCESS,

    DELETE_DIAGRAM,
    DELETE_DIAGRAM_SUCCESS,
    DELETE_DIAGRAM_ERROR,
    DELETE_DIAGRAM_FORGET,
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
export const deleteDiagramForgetAction = () => ({
    type: DELETE_DIAGRAM_FORGET,
});
