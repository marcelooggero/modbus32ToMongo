const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');

const Medicion = require('./model');


var app = express();

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
 );
 mongoose
   .connect(DB, {
     useNewUrlParser: true,
     useCreateIndex: true,
     useUnifiedTopology: true
   })
   .then(con => {
         console.log('DB Connection Successful');
   });

// Implement cors
app.use(cors()); //Access-Control-Allow-Origin permite a otros consumir nuestra api

app.options('*', cors());

// SERVING STATIC FILES
app.use(express.static(path.join(__dirname, 'public')));

//ROUTES
app.use('/api/v1/', async function(req, res, next){
    const respuesta = await Medicion.find()
   
    console.log(respuesta.length)
    res.send(respuesta)
});

app.listen(8080, () => {
    console.log(`App running on port 8080...`);
  });

