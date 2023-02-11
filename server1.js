// Express
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
//app.use('/', express.static('public')); // public 폴더 공유

// Body Parser 
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Logging
const morgan = require('morgan');
app.use(morgan('dev')); 

// CROS(Cross Site) 정책 허용
const cors =require('cors');
app.use(cors()); 

// Router
const user = require('./routes/user');
const customer = require('./routes/customer');
app.use('/image', express.static('upload'));
app.use('/user', user);
app.use('/customer', customer);

//app.listen(port, () => console.log(`listening on port ${port}`));
app.listen(5000, function() { console.log(`listening on port ${port}`)});
