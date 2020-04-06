import {connect} from 'react-redux';

import {unloginAction} from '@/redux/actions/auth';

const mapDispatchToProps = dispatch => ({
    unlogin: () => dispatch(unloginAction()),
});

export const withUnlogin = connect(null, mapDispatchToProps);
