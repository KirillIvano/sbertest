import {connect} from 'react-redux';

const mapStateToProps = ({message}) => ({
    messages: message.messages,
});

export const withMessageBoxProps = connect(mapStateToProps);
