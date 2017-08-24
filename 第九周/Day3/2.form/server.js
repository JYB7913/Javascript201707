let http = require('http');
let fs =require('fs');
let url = require('url');
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
            console.log(query);
            res.end(JSON.stringify(query));
        } else {
            let str = '';
            req.on('data',(data) => str += data);
            req.on('end', () => {
                console.log(str);
               res.end(str); 
            });
        }
    }

}).listen(7080, () => console.log('监听7080端口'));



