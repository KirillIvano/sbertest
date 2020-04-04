import {
    GET_DIAGRAMS_PREVIEWS,
    GET_DIAGRAMS_PREVIEWS_ERROR,
    GET_DIAGRAMS_PREVIEWS_SUCCESS,
    GET_DIAGRAMS_PREVIEWS_FORGET,
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
export const getDiagramsPreviewsForgetAction = () => ({
    type: GET_DIAGRAMS_PREVIEWS_FORGET,
});
