const router = require('express').Router();

const {
    getDiagrams,
    createDiagram,
    getDiagramByIds,
    deleteDiagram,
    renameDiagram,
} = require('~/database/interactors/diagram');
const {jsonResponse} = require('~/helpers/jres');
const {
    createDiagram: createDiagramFile,
    deleteDiagram: deleteDiagramFile,
    updateDiagram: updateDiagramFile,
} = require('~/diagramHost');

router.get('/previews', async (req, res) => {
    const {id: userId} = req.user || {id: '5e8868b4c9f6733d4c73eaf4'};

    try {
        const diagrams = await getDiagrams(userId);
        jsonResponse(res, 200, {diagrams});
    } catch {
        jsonResponse(res, 200, {error: 'Не удалось получить диаграммы'});
    }
});

router.post('/add', async (req, res) => {
    const {id: userId} = req.user || {id: '5e8868b4c9f6733d4c73eaf4'};
    const {name} = req.body;

    if (!name) {
        jsonResponse(res, 400, {error: 'Имя - обязательный параметр'});
        return;
    }

    let diagramFileName;
    try {
        diagramFileName = await createDiagramFile(userId);
    } catch {
        jsonResponse(res, 500, {error: 'Не удалось создать диаграмму'});
        return;
    }

    try {
        const diagram = await createDiagram(userId, name, diagramFileName);
        jsonResponse(res, 200, {diagram});
    } catch {
        jsonResponse(res, 500, {error: 'Ошибка при сохранении'});
    }
},
);

router.delete('/delete/:diagramId', async (req, res) => {
    const {id: userId} = req.user || {id: '5e8868b4c9f6733d4c73eaf4'};
    const {diagramId} = req.params;

    let diagram;
    try {
        diagram = await getDiagramByIds(userId, diagramId);
        if (!diagram) {
            jsonResponse(res, 404, {error: 'Диаграмма не найдена'});
            return;
        }
    } catch {
        jsonResponse(res, 500, {error: 'Ошибка при поиске диаграммы в базе'});
        return;
    }


    const {fileName} = diagram;

    try {
        await deleteDiagramFile(fileName);
    } catch {
        jsonResponse(res, 500, {error: 'Ошибка при удалении диаграммы с сервера'});
        return;
    }

    try {
        await deleteDiagram(userId, diagramId);
    } catch {
        jsonResponse(res, 500, {error: 'Ошибка при удалении диаграммы из базы'});
        return;
    }

    jsonResponse(res, 200);
});

router.put('/rename/:diagramId', async (req, res) => {
    const {id: userId} = req.user || {id: '5e8868b4c9f6733d4c73eaf4'};
    const {diagramId} = req.params;
    const {name} = req.body;

    if (!name) {
        jsonResponse(res, 400, {error: 'Имя не может быть пустым'});
        return;
    }

    try {
        const diagram = await renameDiagram(userId, diagramId, name);
        jsonResponse(res, 200, {diagram});
    } catch {
        jsonResponse(res, 500, {error: 'Ошибка сервера'});
    }
});

router.put(
    '/save/:diagramId',
    async (req, res) => {
        const {id: userId} = req.user || {id: '5e8868b4c9f6733d4c73eaf4'};
        const {diagramId} = req.params;
        const {xml} = req.body;

        const diagram = await getDiagramByIds(userId, diagramId);
        if (!diagram) {
            jsonResponse(res, 404, {error: 'Диаграмма не найдена'});
            return;
        }

        const {fileName} = diagram;
        await updateDiagramFile(fileName, xml);

        jsonResponse(res, 200);
    },
);

module.exports = router;
