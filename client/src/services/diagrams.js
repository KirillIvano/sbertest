import {
    enchanceJsonResponse,
    enchanceTextResponse,
} from '@/helpers/enchanceFetchResponse';

export const getDiagramsPreviews = accessToken =>
    fetch(
        `${SERVER_ORIGIN}/api/diagrams/previews`,
        {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        },
    ).then(enchanceJsonResponse);


export const deleteDiagram = (accessToken, diagramId) =>
    fetch(
        `${SERVER_ORIGIN}/api/diagrams/delete/${diagramId}`,
        {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        },
    ).then(enchanceJsonResponse);

export const createDiagram = (accessToken, name) =>
    fetch(
        `${SERVER_ORIGIN}/api/diagrams/add`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
            body: JSON.stringify({name}),
        },
    ).then(enchanceJsonResponse);

export const renameDiagram = (accessToken, diagramId, name) =>
    fetch(
        `${SERVER_ORIGIN}/api/diagrams/rename/${diagramId}`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
            body: JSON.stringify({name}),
        },
    ).then(enchanceJsonResponse);

export const saveDiagram = (accessToken, diagramId, xml) =>
    fetch(
        `${SERVER_ORIGIN}/api/diagrams/save/${diagramId}`,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
            body: JSON.stringify({xml}),
            method: 'PUT',
        },
    ).then(enchanceJsonResponse);

export const getDiagramXml = (accessToken, fileName) =>
    fetch(
        `${SERVER_ORIGIN}/diagrams/${fileName}`,
        {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        },
    ).then(enchanceTextResponse);
