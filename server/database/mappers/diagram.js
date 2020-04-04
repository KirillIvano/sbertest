const {pick} = require('ramda');

const clientFields = ['name', 'id', 'lastUpdate', 'fileName'];
const clientifyDiagram = diagram => pick(clientFields, diagram);

const validUpdates = ['name'];
const getValidDiagramUpdates = updates => pick(validUpdates, updates);

module.exports = {
    clientifyDiagram,
    getValidDiagramUpdates,
};
