import {
    enchanceJsonResponse,
} from '@/helpers/enchanceFetchResponse';

export const refreshTokens = body => fetch(
    `${SERVER_ORIGIN}/api/auth/refreshTokens`,
    {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    },
).then(enchanceJsonResponse);

export const saveToken = refreshJwt => {
    localStorage.setItem('refreshJwt', refreshJwt);
};

export const getLocalToken = () => localStorage.getItem('refreshJwt');

export const login = body => fetch(
    `${SERVER_ORIGIN}/api/auth/login`,
    {
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
        credentials: 'include',
    }).then(enchanceJsonResponse);
