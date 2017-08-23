let http = require('http');
let fs = require('fs');
let mime = require('mime');

http.createServer((req, res) => {
    console.log(req.url);
    if(req.url === '/'){
        let indexHtml = fs.readFileSync('./index.html');
        res.setHeader('Content-Type', 'text/html;charset=utf-8');
        res.end(indexHtml); // end只是结束响应 并不代表后面代码不执行
        return;
    }

    // console.log(mime.lookup(req.url));
    // 处理静态资源 css js img
    if(fs.existsSync('.' + req.url)){
        let staticData = fs.readFileSync('.' + req.url);
        res.setHeader('Content-Type', `${mime.lookup(req.url)};charset=utf-8`);
        res.end(staticData);
    }

    
}).listen(8050, () => console.log('监听8050端口'));
