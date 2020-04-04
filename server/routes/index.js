const router = require('express').Router();

const authRoutes = require('./auth');
const diagramsRoutes = require('./diagrams');

router.use('/auth', authRoutes);
router.use('/diagrams', diagramsRoutes);

module.exports = router;
