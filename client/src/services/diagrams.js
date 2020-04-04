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
