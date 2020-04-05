export const getJwtPayload =
     jwt => JSON.parse(atob(jwt.split('.')[1]));

export const isTokenExpired = jwt => {
    const {exp} = getJwtPayload(jwt);
    const present = Date.now() / 1000;

    return exp < present;
};
