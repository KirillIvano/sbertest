export const getDiagramsPreviews = () =>
    fetch(
        `${SERVER_ORIGIN}/api/diagrams/previews`,
    ).then(res => res.json()).then(res => console.log(res) || res);
