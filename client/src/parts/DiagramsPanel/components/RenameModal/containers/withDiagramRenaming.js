import {connect} from 'react-redux';

import {renameDiagramAction} from '@/redux/actions/diagrams';

const mapStateToProps = ({diagram}) => {
    const {
        diagramRenamingInProgress,
        diagramRenamingSuccess,
    } = diagram;

    return {
        diagramRenamingInProgress,
        diagramRenamingSuccess,
    };
};

const mapDispatchToProps = (dispatch, {updatedId}) => ({
    renameDiagram: name => dispatch(renameDiagramAction(updatedId, name)),
});

export const withDiagramRenaming = connect(mapStateToProps, mapDispatchToProps);
