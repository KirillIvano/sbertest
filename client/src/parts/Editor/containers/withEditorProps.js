import {connect} from 'react-redux';

const mapStateToProps = ({diagram}) => {
    const {
        diagrams,
        selectedDiagramId,
        diagramFileGettingInProgress,
        diagramFileGettingSuccess,
        diagramFileGettingError,
    } = diagram;

    const selectedDiagram = diagrams.find(({id}) => id === selectedDiagramId);
    if (!selectedDiagram) return {};
    const {
        fileName,
        file,
    } = selectedDiagram;

    return {
        fileName,
        file,

        diagramFileGettingInProgress,
        diagramFileGettingSuccess,
        diagramFileGettingError,
    };
};

export const withEditorProps = connect(mapStateToProps);
