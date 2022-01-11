const express = require('express');

const app = express();

// app.use((req, res, next) => {
//     console.log('This is the first middleware.');
//     next();
// });

// app.use((req, res, next) => {
//     console.log('This is the second middleware.');
//     res.send('<h1>This is the response.</h1>');
// });

app.use('/users', (req, res, next) => {
    console.log('This is the users middleware.');
    res.send('<h1>This is the users page.</h1>');
});

app.use('/', (req, res, next) => {
    console.log('This is the / middleware.');
    res.send('<h1>This is / page.</h1>');
});

app.listen(3000);