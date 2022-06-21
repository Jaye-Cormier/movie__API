const express = require('express'),
app = express(),
bodyParser = require('body-parser'),
morgan = require('morgan'),
res = require('express/lib/response'),
fs = require('fs'), // import built in node modules fs and path
path = require('path');

app.use(bodyParser.json());

// create a write stream (in append mode)
// a 'log.txt' file is created in root directory
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {falgs: 'a'})



let topMovies = [
    {
        title: 'The Matrix',
        director: 'The Wakowskis'
    },
    {
        title: 'The Dark Knight',
        director: 'Christopher Nolan'
    },
    {
        title: 'The Dark Knight Rises',
        director: 'Christopher Nolan'
    },
    {
        title: 'The Hobbit',
        director: 'Peter Jackson'
    },
    {
        title: 'Star Trek Into Darkness',
        director: 'J.J. Abrams'
    },
    {
        title: 'Thor: Ragnarok',
        director: 'Taika Waititi'
    },
    {
        title: 'Die Hard',
        director: 'John McTiernan'
    },
    {
        title: 'Serenity',
        director: 'Joss Whedon'
    },
    {
        title: 'Captain America: Winter Solder',
        director:  'The Russo Brothers'  
    },
    {
        title: 'Pitch Black',
        director: 'David Twohy'
    },
    {
        title: 'Underworld',
        director: 'Len Wiseman'
    }
];

// GET requests
app.get('/', (req, res) => {
    res.send('Welcome to my movie club!');
});

app.get('/documentation', (req, res) => {
    res.sendFile('public/documentation.html', { root: __dirname });
});

app.get('/movies', (req, res) => {
    res.json(topMovies);
});

app.use(morgan('combined', {stream: accessLogStream}));

app.use(express.static('public'));

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// listen for requests
app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
});