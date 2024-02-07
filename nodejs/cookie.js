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
            `Permanent=cookies; Max-Age = ${60*60*24*30}`, // 쿠키를 언제까지 살아있게 할 것인가?
            'Secure=Secure; Secure', // HTTPS로만 통신하는 경우 쿠키를 발급
            'HttpOnly=HttpOnly; HttpOnly'// 자바스크립트를 이용해 쿠키를 훔치지 못하게 하는 보안솔루션
        ]
    });
    response.end('Cookie!!');


}).listen(3000);