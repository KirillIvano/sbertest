const {DiagramModel} = require('~/database/models/diagram');
const {UserModel} = require('~/database/models/user');

const {clientifyDiagram} = require('~/database/mappers/diagram');

const getDiagrams = async userId => {
    const {diagrams} = await UserModel.findById(userId).select('diagrams');

    return diagrams.map(clientifyDiagram);
};

const getDiagramByIds = async (userId, diagramId) => {
    const user = await UserModel.findById(userId);
    if (!user) return null;

    const {diagrams} = user;
    const diagram = diagrams.find(({id}) => id === diagramId);
    if (!diagram) return null;

    return clientifyDiagram(diagram);
};

const createDiagram = async (userId, name, fileName) => {
    const user = await UserModel.findById(userId);

    const diagram = new DiagramModel({name, fileName});
    user.diagrams.push(diagram);
    await user.save();

    return clientifyDiagram(diagram);
};

const deleteDiagram = async (userId, diagramId) => {
    const user = await UserModel.findById(userId);
    const diagrams = user.diagrams.filter(({id}) => id !== diagramId);
    user.diagrams = diagrams;

    await user.save();
};

const renameDiagram = async (userId, diagramId, name) => {
    const user = await UserModel.findById(userId);
    const {diagrams} = user;
    const diagram = diagrams.find(({id}) => id === diagramId);

    diagram.name = name;

    await user.save();

    return clientifyDiagram(diagram);
};

module.exports = {
    getDiagrams,
    getDiagramByIds,
    createDiagram,
    deleteDiagram,
    renameDiagram,
};
