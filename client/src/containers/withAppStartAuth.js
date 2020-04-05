import {connect} from 'react-redux';

import {appStartAuthAction} from '@/redux/actions/auth';

const mapStateToProps = ({auth}) => {
    const {isAuthenticated} = auth;

    return {
        isAuthenticated,
    };
};

const mapDispatchToProps = dispatch => ({
    tryAuth: () => dispatch(appStartAuthAction()),
});

export const withAppStartAuth = connect(mapStateToProps, mapDispatchToProps);
