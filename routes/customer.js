const express = require('express');
const router = express.Router();

// Oracle DB 
const dbConf = require('./database');
const oracledb = require('oracledb');
oracledb.autoCommit = true;

router.get('/1', (req, res) => {
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

router.get('/', function(req, res) {
    oracledb.getConnection(dbConf, (err, conn) => {
        if(err){
          console.error("ORA-ERROR: " + err.message);
          return;
        }
        
        let query = 'select * from customers';
        conn.execute(query, {}, function(err, result){
          if(err){
            console.error(err.message);
            doRelease(conn);
            return;
          }
          console.log(result.rows);
          doRelease(conn, result.rows);
        });
    });

    // DB 연결해제
    function doRelease(conn, rows){
        conn.release(function(err){
            if(err){
                console.error(err.message);
            }
            console.log('list size:' + rows.length);
            res.send(rows);
        })
    }
});

const multer = require('multer');
const upload = multer({dest:'./upload'});
router.get('/image', express.static('./upload'));

router.post('/', upload.single('image'), (req, res) => {
    oracledb.getConnection(dbConf, (err, conn) => {
        if(err){
          console.error("ORA-ERROR: " + err.message);
          return;
        }
        
        let query = 'INSERT INTO customers (id, image, name, birthday, gender, job) ' +
                    'VALUES (:id, :image, :name, :birthday, :gender, :job)';
        
        let binddata = [
            Number(req.body.id),
            '/image/' + req.file.filename,
            req.body.name,
            req.body.birthday,
            req.body.gender,
            req.body.job
        ];

        console.log('' + req.body.id);
        console.log('' + req.file.filename);
        console.log('' + req.body.name);
        

        conn.execute(query, binddata, function(err, result){
          if(err){
            console.error(err.message);
            doRelease(conn);
            return;
          }
          console.log('Row Insert ' + result.rowsAffected);
          doRelease(conn, result.rowsAffected);
        });
    });

    // DB 연결해제
    function doRelease(conn, result){
        conn.release(function(err){
            if(err){
                console.error(err.message);
            }
            res.send('' + result);
        })
    }
});

router.get('/:id', function(req, res) {
    res.send('Received a GET request, param:' + req.params.id);
});

router.post('/1', function(req, res) {
    console.log(JSON.stringify(req.body, null, 2));
    res.json({
        success:true,
        user:req.body.username
    });
});

router.put('/', function(req, res) {
    res.status(400).json({message:'Hey, You. Bad Request!'});
});

router.delete('/', function(req, res) {
    res.send('Received a DELETE request');
});

module.exports = router;