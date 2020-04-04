export const getDiagramsPreviews = () =>
    fetch(
        `${SERVER_ORIGIN}/api/diagrams/previews`,
    ).then(res => res.json());

export const deleteDiagram = diagramId =>
    fetch(
        `${SERVER_ORIGIN}/api/diagrams/delete/${diagramId}`,
        {
            method: 'DELETE',
        },
    ).then(res => res.json());

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
    ).then(res => res.json());
