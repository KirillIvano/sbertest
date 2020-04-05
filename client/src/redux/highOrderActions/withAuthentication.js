import {WITH_AUTHENTICATION} from '@/redux/names/auth';

export const withAuthentication = action => ({
    type: WITH_AUTHENTICATION,
    action,
});
