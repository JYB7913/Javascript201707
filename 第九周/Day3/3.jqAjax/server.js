let http = require('http');
let fs =require('fs');
let url = require('url');
let mime = require('mime');
http.createServer((req, res) => {
    let {pathname, query} = url.parse(req.url, true);
    if(pathname === '/'){
        let htmlStr = fs.readFileSync('./index.html');
        res.setHeader('Content-Type', 'text/html;charset=utf-8');
        res.end(htmlStr);
        return;
    }

    if(pathname === '/userInfo') {
        if(req.method === 'GET') {
            let obj = {id:24};
            // res.end(JSON.stringify(obj));
            // res.end('alert(123)');
        } else {
            let str = '';
            req.on('data',(data) => str += data);
            req.on('end', () => {
                console.log(str);
               // res.end('alert(1243)');
                res.end('hello world')
            });
        }
        return;
    }

    let flag = fs.existsSync('.' + pathname);
    if(flag) {
        let resData = fs.readFileSync('.' + pathname);
        res.setHeader('Content-Type', `${mime.lookup(pathname)};charset=utf-8`);
        res.end(resData);
    } else {
        res.statusCode = 404;
        res.end('404 NOT FOUND!')
    }

}).listen(7080, () => console.log('监听7080端口'));



