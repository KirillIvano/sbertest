import {connect} from 'react-redux';

const mapStateToProps = ({diagram}) => {
    const {isDiagramSavingInProgress} = diagram;

    return {
        isDiagramSavingInProgress,
    };
};

export const withSavingProgressInfo = connect(mapStateToProps);
