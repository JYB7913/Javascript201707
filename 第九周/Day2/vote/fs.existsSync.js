let fs = require('fs');

let flag = fs.existsSync('./index2.css'); // 根据文件路径检测文件是否存在
console.log(flag);