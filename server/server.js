const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
const proxy = require('express-http-proxy');

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../public')));
app.use('/', proxy('http://localhost:3004/player/sc'));
app.use('/', proxy('http://localhost:3003/song/:id'));





app.listen(port, () => {
    console.log(`Server running at: http://localhost:${port}`);
});