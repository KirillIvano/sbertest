import {connect} from 'react-redux';

const mapStateToProps = ({diagram}) => {
    const {
        diagrams,
        selectedDiagramId,
    } = diagram;

    const selectedDiagram = diagrams.find(({id}) => id === selectedDiagramId);
    if (!selectedDiagram) return {};
    const {fileName} = selectedDiagram;

    return {fileName};
};

export const withEditorProps = connect(mapStateToProps);
