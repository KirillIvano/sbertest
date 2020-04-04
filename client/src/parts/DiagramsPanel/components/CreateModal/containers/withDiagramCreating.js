import {connect} from 'react-redux';

import {createDiagramAction} from '@/redux/actions/diagrams';

const mapStateToProps = ({diagram}) => {
    const {
        diagramCreatingInProgress,
        diagramCreatingSuccess,
    } = diagram;

    return {
        diagramCreatingInProgress,
        diagramCreatingSuccess,
    };
};

const mapDispatchToProps = dispatch => ({
    createDiagram: name => dispatch(createDiagramAction(name)),
});

export const withDiagramCreating = connect(mapStateToProps, mapDispatchToProps);
