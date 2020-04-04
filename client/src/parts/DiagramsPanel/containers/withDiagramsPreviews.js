import {connect} from 'react-redux';
import {getDiagramsPreviewsAction, selectDiagramAction} from '@/redux/actions/diagrams';

const mapStateToProps = ({diagram}) => {
    const {
        diagramsGettingInProgress,
        diagramsGettingError,
        diagrams,
    } = diagram;

    return {
        diagramsGettingInProgress,
        diagramsGettingError,
        diagrams,
    };
};

const mapDispatchToProps = (dispatch) => ({
    getPreviews: () => dispatch(getDiagramsPreviewsAction()),
    selectDiagram: diagramId => dispatch(selectDiagramAction(diagramId)),
});

export const withDiagramsPreviews = connect(mapStateToProps, mapDispatchToProps);
