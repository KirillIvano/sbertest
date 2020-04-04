const fs = require('fs');
const path = require('path');
const util = require('util');

const {createShortRandomKey} = require('~/helpers/createRandomKey');

const getDir = util.promisify(fs.readdir);
const writeFile = util.promisify(fs.writeFile);
const deleteFile = util.promisify(fs.unlink);
const copyFile = util.promisify(fs.copyFile);

const DIAGRAMS_PATH = path.resolve(__dirname, '..', 'diagrams');
const DEFAULT_DIAGRAM_PATH = path.resolve(DIAGRAMS_PATH, 'default.bpmn');

const getDiagramPath = filename => path.resolve(DIAGRAMS_PATH, filename);

const generateFileName = async (prefix, extension) => {
    const dirContent = await getDir(DIAGRAMS_PATH);

    while (true) {
        const fileName = `${prefix}_${createShortRandomKey()}.${extension}`;
        if (!dirContent.includes(fileName)) {
            return fileName;
        }
    }
};

const createDiagram = async prefix => {
    const fileName = await generateFileName(prefix, 'bpmn');
    await copyFile(DEFAULT_DIAGRAM_PATH, getDiagramPath(fileName));

    return fileName;
};

const updateDiagram = async (diagramName, xml) => {
    await writeFile(getDiagramPath(diagramName), xml);
};

const checkIfDiagramExists = async fileName => {
    const dirContent = await getDir(path.resolve(__dirname, '..', 'diagrams'));

    return dirContent.includes(fileName);
};

const deleteDiagram = async diagramName => {
    await deleteFile(getDiagramPath(diagramName));
};

module.exports = {
    createDiagram,
    updateDiagram,
    deleteDiagram,
    checkIfDiagramExists,
};
