const express = require('express');
const router = express.Router();

// Oracle DB 
const dbConf = require('./database');
const oracledb = require('oracledb');
oracledb.autoCommit = true;

// DB 연결해제
function doRelease(conn, message){
      conn.release(function(err){
          if(err){
              console.error(err.message);
          }
          console.log(message);
      })
}

router.get('/', function(req, res) {
    oracledb.getConnection(dbConf, (err, conn) => {
        if(err){
          console.error("ORA-ERROR: " + err.message);
          return;
        }
        
        let query = 'select * from customers where isDeleted = 0';
        conn.execute(query, {}, function(err, result){
          if(err){
            console.error(err.message);
            doRelease(conn);
            return;
          }
          // console.log(result.rows);          
          doRelease(conn, "Row Count : " + result.rows.length);
          res.send(result.rows);
        });
    });
});

const multer = require('multer');
const upload = multer({dest:'./upload'});

router.post('/', upload.single('image'), (req, res) => {
    oracledb.getConnection(dbConf, (err, conn) => {
        if(err){
          console.error("ORA-ERROR: " + err.message);
          return;
        }
        
        let query = 'INSERT INTO customers (id, image, name, birthday, gender, job, createddate, isDeleted) ' +
                    'VALUES (:id, :image, :name, :birthday, :gender, :job, SYSDATE, 0)';
        
        let binddata = [
            Number(req.body.id),
            '/image/' + req.file.filename,
            req.body.name,
            req.body.birthday,
            req.body.gender,
            req.body.job
        ];

        conn.execute(query, binddata, function(err, result){
          if(err){
            console.error(err.message);
            doRelease(conn);
            return;
          }
          doRelease(conn, 'Row Insert ' + result.rowsAffected);
          res.send('' + result.rowsAffected);
        });
    });
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

router.delete('/:id', function(req, res) {
  oracledb.getConnection(dbConf, (err, conn) => {
    if(err){
      console.error("ORA-ERROR: " + err.message);
      return;
    }
    
    let query = 'UPDATE customers SET isDeleted = 1 ' +
                'WHERE id = :id';
    
    let binddata = [
        Number(req.params.id)
    ];
    console.log('req.params.id : ' + req.params.id);

    conn.execute(query, binddata, function(err, result){
      if(err){
        console.error(err.message);
        doRelease(conn);
        return;
      }
      doRelease(conn, 'Row Detete : ' + result.rowsAffected)
      res.send('' + result.rowsAffected);
    });
  });
});

module.exports = router;