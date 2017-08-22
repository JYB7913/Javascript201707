

// (function (exports, require, module, __filename, __dirname) {
//     console.log(a(10, 20));
// })();

console.log(__filename); // 当前所在文件的绝对路径
console.log(__dirname); // 当前文件所在目录的绝对路径

// exports = module.exports

// module.exports.id = 123;
// module.exports = {
//     id: 100,
//     say: 'nihao'
// };
// exports.name = 'zhufeng';



// 默认导出 的 module.exports

// module = {
//     exports: {
//        
//     }
// };
// let exports = module.exports;

// 等于 将 exports 这个变量指向了 一个新的空间 不是以前 导出那个空间
exports = {
    id:12,
    say: 'exports'
};

// module.exports 可以批量导出
// exports 只能一个个导出