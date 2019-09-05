const express = require('express');
// const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;
// const cors = require('cors');

// require('./db/db');



app.get('/', (req, res) => {
    res.send('Hello Me, its Me.')
})





app.listen(PORT, ()=>{
    console.log(`Loud and clear on ${3000}`);
})