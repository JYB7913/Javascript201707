let http = require('http');
let fs = require('fs');
let url = require('url');
let mime = require('mime');

let resObj = {
    "errno": 0,
    "msg": "success"
};
http.createServer((req, res) => {
        let {pathname, query} = url.parse(req.url, true);
        if(pathname === '/'){
            let indexContent = fs.readFileSync('./index.html');
            res.setHeader('Content-Type', 'text/html;charset=utf-8');
            res.end(indexContent);
            return
        }

    // 列表接口
    if(pathname === '/getUserAll'){
        let lists = fs.readFileSync('./user.json', 'utf8');

        resObj.data = JSON.parse(lists);
        res.setHeader('Content-Type', 'application/json;charset=utf-8');
        res.end(JSON.stringify(resObj));
        return;
    }

    // 根据指定id 返回相应一组数据
    if(pathname === '/getUser'){
        let uid = query.id;
        let users = JSON.parse(fs.readFileSync('./user.json', 'utf8'));
            let user;
            for(let i = 0; i < users.length; i++) {
                if(users[i].id == uid){
                    user = users[i];
                    break;
                }
        }
        resObj.data =  user? [user] : [];
        res.end(JSON.stringify( resObj));
        return
    }

    // 处理静态资源请求
    let flag = fs.existsSync('.' + pathname);
    if(flag) {
        let staticContent = fs.readFileSync('.' + pathname);
        res.setHeader('Content-Type', `${mime.lookup(pathname)};charset=utf-8`);
        res.end(staticContent);
    } else {
        res.statusCode = 404;
        let errorInfo = fs.readFileSync('./error.html');
        res.setHeader('Content-Type', `text/html;charset=utf-8`);
        res.end(errorInfo);
    }

}).listen(9090, () => console.log('prot 9090'));
