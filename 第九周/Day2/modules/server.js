let http = require('http'); // 搭建web server
//  req 客户端请求对象
//  res 服务端响应对象
http.createServer(function (req, res) {
    res.end('Hello Node!')
}).listen(8080, function () {
    console.log('监听8080端口');
});

