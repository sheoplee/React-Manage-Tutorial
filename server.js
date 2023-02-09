// Include it and extract some methods for convenience
const express = require('express');
const cors =require('cors');
const bodyParser = require('body-parser');
const app = express();
const user = require('./routes/user')
const port = process.env.PORT || 5000;
const morgan = require('morgan');

// const myLogger = function(req, res, next) {
//     console.log(req.url);
//     next();    
// }
// app.use(myLogger);
app.use(morgan('dev')); // Logging
app.use(cors()); // CROS(Cross Site) 정책 허용
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/', express.static('public'));
app.use('/user', user);
app.use('/proxy', (req, res) => res.json({username:'bryan'}));

app.get('/api/customers', (req, res) => {
  res.send([
      {
        id: 1,
        image: 'https://placeimg.com/32/32/1',
        name: "홍길동",
        birthday: "970219",
        gender: "남자",
        job: "대학생"
      },
      {
        id: 2,
        image: 'https://placeimg.com/64/64/2',
        name: "김아무개",
        birthday: "881219",
        gender: "여자",
        job: "회사원"
      },
      {
        id: 3,
        image: 'https://placeimg.com/64/64/3',
        name: "이순신",
        birthday: "781219",
        gender: "남자",
        job: "디자이너"
      }
    ]);
});


app.get('/api/customers', (req, res) => {
    // Access-Control-Allow-Origin 도메인을 지정한다
    //res.header("Access-Control-Allow-Origin", "*");
    // Access-Control-Allow-Methods 를 지정하지 않으면 GET, POST 만 가능
    //res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH");

    res.send([
        {
          id: 1,
          image: 'https://placeimg.com/32/32/1',
          name: "홍길동",
          birthday: "970219",
          gender: "남자",
          job: "대학생"
        },
        {
          id: 2,
          image: 'https://placeimg.com/64/64/2',
          name: "김아무개",
          birthday: "881219",
          gender: "여자",
          job: "회사원"
        },
        {
          id: 3,
          image: 'https://placeimg.com/64/64/3',
          name: "이순신",
          birthday: "781219",
          gender: "남자",
          job: "디자이너"
        }
      ]);
});

//app.listen(port, () => console.log(`listening on port ${port}`));
app.listen(5000, function() { console.log(`listening on port ${port}`)});
