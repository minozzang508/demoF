var express = require('express');
var app = express();
var cors = require('cors')

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



app.use(cors());


var routes = require('./routes');


app.use('/', routes);

//handle code error page
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('서버 오류');
});

//handle not found page
app.use(function(req, res, next) {
    res.status(404).send('없는 페이지입니다.');
});

app.get('/products/:id', function (req, res, next) {
    res.json({msg: 'This is CORS-enabled for all origins!'})
  });
  



app.listen(7800, function() {
    console.log('running at http://localhost:7800');
});