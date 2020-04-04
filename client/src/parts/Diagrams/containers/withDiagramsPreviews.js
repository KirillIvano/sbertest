import {connect} from 'react-redux';
import {getDiagramsPreviewsAction} from '@/redux/actions/diagrams';

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
});

export const withDiagramsPreviews = connect(mapStateToProps, mapDispatchToProps);
