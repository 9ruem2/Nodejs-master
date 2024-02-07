var http = require('http');
var cookie = require('cookie');


http.createServer(function(request, response){
    console.log(request.headers.cookie);
    var cookies = {};

    // 쿠키 읽기
    if(request.headers.cookie !== undefined){
        cookies = cookie.parse(request.headers.cookie); // 쿠키를 지우면 undefined면 서버가 꺼짐, parse는 undefined를 수용하지 못함 따라서 if문으로 분기점을 내는것.
    }
    console.log(cookies);

    // 쿠키 생성
    response.writeHead(200, {
        'Set-Cookie' : [
            'yummy_cookie=choco', 
            'tasty_cookie=strawberry',
            `Permanent=cookies; Max-Age = ${60*60*24*30}`]
    });
    response.end('Cookie!!');


}).listen(3000);