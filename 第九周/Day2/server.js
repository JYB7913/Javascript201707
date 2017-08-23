let http = require('http');
let fs = require('fs');
let mime = require('mime');


// req 客户端请求对象
// res 服务端响应对象
http.createServer((req, res) => {
    // console.log(req.url); // /getUser?id=14&list=10
    if(req.url === '/'){ // 访问根路径时 返回首页
        let indexContent = fs.readFileSync('./index.html');
        res.setHeader('Content-Type', 'text/html;charset=utf-8');
        res.end(indexContent);
        return;
    }
    // 数据接口
    if(req.url === '/lists'){
        let obj = {id:1, name: 'zhufeng'};
        res.end(JSON.stringify(obj));
        return;
    }

    console.log(req.url); // /getUser?id=14&list=10
    console.log(req.url === 'getUser'); // false
    if(req.url  === '/getUser'){
        let obj = {id:2, name: 'node.js'};
        res.end(JSON.stringify(obj));
        return;
    }

    // 静态资源请求处理  css js img
    let flag = fs.existsSync('.' + req.url); // 检测文件是否存在
    if(flag){
        let staticData = fs.readFileSync('.' + req.url);
        res.setHeader('Content-Type', `${mime.lookup(req.url)};charset=utf-8`);
        res.end(staticData);
    } else { // 如果不存在时候的处理
        res.statusCode = 404; // 设置 状态码
        let errorData = fs.readFileSync('./error.html');
        res.setHeader('Content-Type', `text/html;charset=utf-8`);
        res.end(errorData);
    }
}).listen(8080, () => console.log('监听8080'));