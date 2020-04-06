const router = require('express').Router();

const {jsonResponse} = require('~/helpers/jres');
const {createRandomKey} = require('~/helpers/createRandomKey');
const {generateJwtPair, verifyJwt} = require('~/helpers/jwt');
const {loginUser, createUser} = require('~/database/interactors/user');

const COOKIE_EXPIRATION = 30 * 24 * 60 * 60 * 100;

// для тестирования
router.post('/register', async (req, res) => {
    const {name, password} = req.body;

    await createUser(name, password);

    jsonResponse(
        res,
        200,
        {
            ok: true,
        },
    );
});

router.post('/login', async (req, res) => {
    const {name, password} = req.body;
    if (!name || !password) {
        jsonResponse(res, 400, {ok: false, error: 'Логин и пароль обязательны для заполнения'});
        return;
    }

    let user;
    try {
        user = await loginUser(name, password);
    } catch(m) {
        const {error} = m;
        if (error === 'user')
            jsonResponse(res, 404, {error: 'Нет пользователя с таким именем'});
        else if (error === 'password')
            jsonResponse(res, 400, {error: 'Неверный пароль'});
        else jsonResponse(res, 500, {error: 'Ошибка сервера'});
        return;
    }
    if (!user) {
        jsonResponse(res, 404, {error: 'Нет пользователя с таким именем'});
        return;
    }

    const userId = user.id;

    const csrf = createRandomKey();
    const {refreshJwt, accessJwt} = generateJwtPair(userId, csrf);

    res.cookie('jwt', refreshJwt, {httpOnly: true, maxAge: COOKIE_EXPIRATION, overwrite: true});

    jsonResponse(
        res,
        200,
        {
            refreshJwt,
            accessJwt,
        },
    );
});

router.post('/refreshTokens', async (req, res) => {
    const {jwt: refreshToken} = req.cookies;
    const {csrf} = req.body;

    if (!refreshToken || !csrf) {
        jsonResponse(res, 400, {error: 'Нет данных для входа'});
        return;
    }

    let tokenPayload;
    try {
        tokenPayload = verifyJwt(refreshToken);
    } catch {
        jsonResponse(res, 400, {error: 'Невалидный токен'});
        return;
    }

    const {csrf: tokenCsrf, id} = tokenPayload;

    if (tokenCsrf !== csrf) {
        jsonResponse(res, 400, {error: 'Не совпадают данные куки и токена'});
        return;
    }

    const newCsrf = createRandomKey();
    const {accessJwt, refreshJwt} = generateJwtPair(id, newCsrf);

    res.cookie('jwt', refreshJwt, {httpOnly: true, maxAge: COOKIE_EXPIRATION});
    jsonResponse(res, 200, {
        accessJwt,
        refreshJwt,
    });
});

module.exports = router;
