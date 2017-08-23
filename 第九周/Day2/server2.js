let http = require('http'); // 搭建web服务器
let fs = require('fs'); // 文件系统 读取/写入
let url = require('url'); // 解析url
let mime = require('mime'); // 解析文件mime类型 第三方

http.createServer((req, res) => {
    let {pathname, query} = url.parse(req.url, true);
    // 访问根路径 返回首页
    if (pathname === '/') {
        let htmlStr = fs.readFileSync('./index.html');
        res.setHeader('Content-Type', 'text/html;charset=utf-8');
        res.end(htmlStr);
        return;
    }

    // 数据接口
    if (pathname === '/vote/user') {
        let userData = fs.readFileSync('./user.json');
        res.setHeader('Content-Type', 'application/json;charset=utf-8');
        res.end(userData);
        return;
    }

// 检测 请求的静态资源文件 是否存在于服务器的硬盘中
    let flag = fs.existsSync('.' + pathname);
    console.log(flag);
        if (flag) {
        let staticContent = fs.readFileSync('.' + pathname);
        // 设置响应头 告诉客户端 响应内容的mime类型和字符编码格式
        res.setHeader('Content-Type', `${mime.lookup(pathname)};charset=utf-8`);
        res.end(staticContent); // 结束响应 并将静态内容 响应给客户端
    } else { // 访问资源不存在时响应
        res.statusCode = 404;
        let errorHtml = fs.readFileSync('./error.html');
        res.end(errorHtml);
    }

}).listen(8070, () => console.log('监听8070'));
// fs.readFileSync('/'); // illegal operation on a directory, read