let http = require('http');
let fs = require('fs'); // I/O 文件系统
let mime = require('mime');



let server = http.createServer(function (req, res) {
   if(req.url === '/user'){ // 如果请求的是 /user 就将user.json数据响应给客户端
       fs.readFile('./user.json', 'utf8', function (err, data) { // 异步读取
           if(err){// 失败响应
               let error = {"errno": -1, "msg": "error", data:[]};
               res.end(JSON.stringify(error));
           } else  { // 成功响应
               // 设置响应头 告诉客户端 响应内容的mime类型以及字符编码格式
               res.setHeader('Content-Type', 'application/json;charset=utf-8');
               res.end(data);  // string And buffer
           }
       });
   }
});
server.listen(8030, () => console.log('监听8030端口'));

// let server = http.createServer(function (req, res) {
//     if(req.url === '/user'){
//         res.end('./user.json')
//     }
// });
