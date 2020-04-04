import {connect} from 'react-redux';

const mapStateToProps = ({diagram}) => {
    const {
        diagrams,
        selectedDiagramId,
    } = diagram;
    console.log(selectedDiagramId);

    const selectedDiagram = diagrams.find(({id}) => id === selectedDiagramId);
    console.log(selectedDiagram);
    if (!selectedDiagram) return {};
    const {fileName} = selectedDiagram;

    return {fileName};
};

export const withEditorProps = connect(mapStateToProps);
