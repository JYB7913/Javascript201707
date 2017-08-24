let http = require('http'),url=require('url'),fs = require('fs'),mime = require('mime');

 http.createServer((req,res)=>{
     let {pathname, query} = url.parse(req.url,true);
     let method = req.method; // 请求方式

     if( pathname === '/'){
        let insexContent = fs.readFileSync('./index.html');
         res.setHeader('Content-Type','text/html;charset=utf-8');
         res.end(insexContent);
         return;
     }

     if(pathname ==='/datalist'){
        if(method === 'GET'){
            console.log(query);
        } else if(method === 'POST'){
            let str ='';
            req.on('data',(data) => { // 持续监听 请求体传输过来的数据 一点一点传输过来的
                str += data;
            });
            req.on('end', () => { // 接收数据完毕后 执行
                console.log(typeof str);
                 // console.log(JSON.parse(str)); // { id: 26, obj: 'react' }
                let users = JSON.parse(fs.readFileSync('./user.json', 'utf8'));
                users.push(JSON.parse(str));
                fs.writeFileSync('./user.json', JSON.stringify(users), 'utf8');
            });
        }
         let userData = fs.readFileSync('./user.json','utf8');
         res.setHeader('Content-Type','application/json;charset=utf-8');
         res.end(userData);
         return;
     }


     let flag = fs.existsSync('.'+pathname);
     if(flag){
         let stadicContent = fs.readFileSync('.'+pathname);
         res.setHeader('Content-Type',`${mime.lookup(pathname)};charset=utf-8`);
         res.end(stadicContent);
     }

 }).listen(8080,()=>console.log('监听8080端口'));
