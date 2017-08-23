let http = require('http'); // 搭建web server
//  req 客户端请求对象
//  res 服务端响应对象

let user = [{id:1, name: "zhufeng"}, {id:2, name: "node"}];
http.createServer(function (req, res) {
    if(req.url === '/vote/index'){
        res.end(JSON.stringify(user));  // 结束响应 并将指定内容 响应给客户端
    } else if(req.url === '/vote/register'){
        res.end('register')
    } else if(req.url === '/vote/about'){
        res.end('about');
    }
}).listen(8070, function () {
    console.log('监听8070端口');
});

