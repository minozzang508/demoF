const express = require('express');
const router = express.Router();
const mysql = require('mysql');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'gkxm2525',
    database: 'payhere',
    connectionLimit: 20,
    waitForConnections: false
});


router.post('/add',function(req,res){

    let newRecruit = {
        name: req.body.name,
        content: req.body.content,
        email: req.body.email,
        regdate: new Date(),
      
    };
    console.log( " router post /add" );
    console.log(" name " + + newRecruit.name);
    console.log(" content " + + newRecruit.content);
    console.log(" email " + + newRecruit.email);
    //console.log("new Report" + newReport);
    pool.getConnection(function(err, conn) {
        if (err) {
            console.log("add recruit err" + err);
            conn.release();
        }

        var sql = "INSERT INTO recruit SET ?";
        conn.query(sql, newRecruit, function(err, result) {
            if (err) {
                console.log("add recruit Query err" + err);
                conn.release();
            }
            res.send(result);
            conn.release();
        });
    });
    
});

router.get('/add', function(req,res){
    res.header("Access-Control-Allow-Origin", "*");

    res.send('test add page');
})

router.get('/', function(req,res){
    res.header("Access-Control-Allow-Origin", "*");

    res.send('test add page');
})


router.get('/', function(req,res){
   
    if (req.user)
        users = req.user;

    var sql = "SELECT r.id,r.title,r.book,r.img,u.displayName FROM report r JOIN users u WHERE r.user_id=u.id and r.user_id=?";

    pool.getConnection(function(err, conn) {
        if (err) {
            console.log("pool get connection error: " + err);
            conn.release();
        }
        //sql = "SELECT * FROM report";
        conn.query(sql, req.user.id, function(err, result) {
            if (err) {
                console.log("index query err" + err);
                conn.release();
            }
            // console.log(result);
            res.render('book/mine', { user: users, report: result });
            conn.release();
        });
    });
})


function ensureAuthenticated(req, res, next) {
    // 로그인이 되어 있으면, 다음 파이프라인으로 진행
    if (req.isAuthenticated()) { return next(); }
    // 로그인이 안되어 있으면, login 페이지로 진행
    res.redirect('/');
}


module.exports = router;