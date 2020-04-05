import {connect} from 'react-redux';

import {loginStartAction} from '@/redux/actions/login';

const mapStateToProps = ({login}) => {
    const {
        loading,
        success,
        error,
    } = login;

    return {
        loginInProgress: loading,
        loginSuccess: success,
        loginError: error,
    };
};

const mapDispatchToProps = dispatch => ({
    login: body => dispatch(loginStartAction(body)),
});

export const withLoggingIn = connect(mapStateToProps, mapDispatchToProps);
