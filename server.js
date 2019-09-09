const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 9000;
const cors = require('cors');
const session = require('express-session');

require('./db/db');



app.get('/', (req, res) => {
    res.send('Hello Me, its Me.')
})

app.use(session({
    secret: "wallallallabeeee wollollololooooo",
    resave: false,
    saveUninitialized: false,
}))
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const corsOptions = {
    origin: ['http://localhost:3000', 'http://localhost:9000'],
    credentials: true,
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));

const userController = require('./controllers/userController');
const projectController = require('./controllers/projectController.js')

app.use('/users', userController);
app.use('/projects', projectController);



app.listen(PORT, ()=>{
    console.log(`Loud and clear on ${PORT}`);
})