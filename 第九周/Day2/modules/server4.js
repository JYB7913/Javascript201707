let http = require('http');
let fs = require('fs');
// 同步读取 没有回调函数 结果作为返回值
// let resData = fs.readFileSync('./user.json', 'utf8');
// console.log(resData);

// 异步操作 没有返回值 有回调函数 通常 第一个参数 时err 第二个结果
// fs.readFile('./user.json', 'utf8', (err, data)=>{
//     console.log(data);
// })



let port = 8060;
http.createServer((req, res) =>{
    if(req.url === '/lists'){ // 根据不同请求路径 做出相应的响应处理
       let resData = fs.readFileSync('./user.json');
       res.setHeader('Content-Type', 'application/json;charset=utf-8');
       res.end(resData);
    }
}).listen(port,()=>{
    console.log(`监听${port}端口`);
});