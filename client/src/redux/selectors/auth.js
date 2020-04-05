export const selectCsrfToken = state => state.auth.csrf;
export const selectIfAuthenticated = state => state.auth.isAuthenticated;

export const selectAccessJwt = state => state.auth.accessJwt;
export const selectRefreshJwt = state => state.auth.refreshJwt;

export const selectIfInitialAuthFinished = state => state.auth.isInitialAuthFinished;
