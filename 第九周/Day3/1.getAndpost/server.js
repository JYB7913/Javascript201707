let http = require('http');
let fs = require('fs');
let url = require('url');
let resObj = {
    errno: 0,
    msg: 'success'
};
http.createServer((req, res) => {
    let {pathname, query} = url.parse(req.url, true);
    if(pathname === '/'){
        let htmlStr = fs.readFileSync('./2.html');
        res.setHeader('Content-Type', 'text/html;charset=utf-8');
        res.end(htmlStr);
        return;
    }
    if(pathname === '/getUser'){
        let users = JSON.parse(fs.readFileSync('./user.json')); // 只要请求这个接口 都要读取一遍 存储的数据 然后进行查询或增加操作
        if(req.method === 'GET') {
            let id = query.id;
            res.setHeader('Content-Type', 'application/json;charset=utf-8');
            if(id){
                let user = users.find((item) => item.id == id);
                resObj.data = user ? [user] : [];
            } else { // 返回所有
                resObj.data = users;
            }
            res.end(JSON.stringify(resObj));
        } else if(req.method === 'POST') {
            let str = '';
            req.on('data', (data) => str += data);
            req.on('end', () =>{
                let resData = JSON.parse(str);
                // console.log(resData); // { say: 'nihao', hi: 'hello' }
                resData.id = users[users.length-1].id + 1;
                users.push(resData); // 将要增加数据添加到列表中
                // 重新写入json中
                fs.writeFileSync('./user.json', JSON.stringify(users), 'utf8');
                resObj.data = users;
                res.end(JSON.stringify(resObj));
            });
        }
    }

}).listen(7000, () => console.log('监听7000'));