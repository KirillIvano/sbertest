const passport = require('passport');
const {Strategy} = require('passport-http-bearer');

const {verifyJwt} = require('~/helpers/jwt');
const {getAdminById} = require('~/database/interactors/user');

passport.use(new Strategy(
    async (token, done) => {
        let payload;

        try {
            payload = await verifyJwt(token);
        } catch(e) {
            return done('Invalid token');
        }

        const {id} = payload;

        const user = await getAdminById(id);

        return done(null, user);
    },
));
