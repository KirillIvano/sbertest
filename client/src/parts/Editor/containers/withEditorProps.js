import {connect} from 'react-redux';

import {saveDiagramAction} from '@/redux/actions/diagrams';

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
        name,
    } = selectedDiagram;

    return {
        fileName,
        diagramName: name,
        file,
        diagramId: selectedDiagramId,

        diagramFileGettingInProgress,
        diagramFileGettingSuccess,
        diagramFileGettingError,
    };
};

const mapDispatchToProps = dispatch => ({
    saveXml: (diagramId, xmlContent) => dispatch(saveDiagramAction(diagramId, xmlContent)),
});

export const withEditorProps = connect(mapStateToProps, mapDispatchToProps);
