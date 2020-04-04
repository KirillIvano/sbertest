import {connect} from 'react-redux';
import {deleteDiagramAction} from '@/redux/actions/diagrams';

const mapStateToProps = ({diagram}) => {
    const {
        diagramDeletingInProgress,
        diagramDeletingSuccess,
        diagramDeletingError,
    } = diagram;

    return {
        diagramDeletingInProgress,
        diagramDeletingSuccess,
        diagramDeletingError,
    };
};

const mapDispatchToProps = dispatch => ({
    deleteDiagram: diagramId => dispatch(deleteDiagramAction(diagramId)),
});

export const withDiagramDeleting = connect(mapStateToProps, mapDispatchToProps);
