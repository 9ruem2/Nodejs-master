const express = require('express');
const app = express();
const port = 3000;
var fs = require('fs');
var bodyParser = require('body-parser');
var compression = require('express-compression'); // 데이터 압축하는 미들웨어
var helmet = require('helmet'); // 헬맷이라는 보안솔루션
app.use(helmet());

var indexRouter = require('./routes/index');
var topicRouter = require('./routes/topic');





// 미들웨어 사용하는 방법
// 요청이 들어올 때 마다 미들웨어가 실행되는 것으로 약속되어있음
// 사용자가 분석한 코드를 분석해서 사용하고자 하는 콜백을 호출하면서 콜백의 첫번째 인자에 body를 만들어줌
app.use(express.static('public')); // 정적파일 
app.use(bodyParser.urlencoded({ extended: false })); // bodyParser.urlencoded({ extended: false })미들웨어를 표현하는 표현식
app.use(compression()); // compression이 미들웨어를 return하도록 해서 app.use를 통해 장착됨
app.get('*',function(request,response,next){
  fs.readdir('./data', function(error, filelist){ // data파일을 읽어오고 -> function이 동작 -> filelist성공, error실패 따라서 fs.라이브러리로 filelist를 읽어올 수 있음 
    request.list = filelist;
    next(); // 그다음에 호출해야 할 미들웨어가 담겨있음
  });
});


app.use('/',indexRouter);
app.use('/topic',topicRouter);

app.use(function(req, res, next){
  res.status(404).send('sorry cant find that!')
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500).send('Somthing broke!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});

