require('dotenv').config();
require('module-alias/register');

const express = require('express');
const cors = require('cors');
const http = require('http');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const app = express();

require('~/initializers/initDb');
require('~/initializers/initPassport');
const routes = require('./routes');

app.use(cors({credentials: true, origin: ['http://localhost:8080', 'http://194.67.113.29:5000']}));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.resolve(__dirname, '..', 'client', 'dist')));

app.use('/api', routes);
app.use('/diagrams', express.static(path.resolve(__dirname, 'diagrams')));
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'client', 'dist', 'index.html'));
});

const server = http.createServer(app);
server.listen(process.env.PORT || 5000);
