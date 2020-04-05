const router = require('express').Router();

const {auth} = require('~/middlewares/auth');

const authRoutes = require('./auth');
const diagramsRoutes = require('./diagrams');

router.use('/auth', authRoutes);
router.use('/diagrams', auth('bearer', {session: false}), diagramsRoutes);

module.exports = router;
