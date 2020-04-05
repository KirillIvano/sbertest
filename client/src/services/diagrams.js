import {
    enchanceJsonResponse,
    enchanceTextResponse,
} from '@/helpers/enchanceFetchResponse';

export const getDiagramsPreviews = () =>
    fetch(
        `${SERVER_ORIGIN}/api/diagrams/previews`,
    ).then(enchanceJsonResponse);

export const getDiagramXml = fileName =>
    fetch(
        `${SERVER_ORIGIN}/diagrams/${fileName}`,
    ).then(enchanceTextResponse);

export const deleteDiagram = diagramId =>
    fetch(
        `${SERVER_ORIGIN}/api/diagrams/delete/${diagramId}`,
        {
            method: 'DELETE',
        },
    ).then(enchanceJsonResponse);

export const createDiagram = name =>
    fetch(
        `${SERVER_ORIGIN}/api/diagrams/add`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name}),
        },
    ).then(enchanceJsonResponse);
