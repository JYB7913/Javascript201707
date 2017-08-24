let fs = require('fs');

// let img1 = fs.readFileSync('./logo.png');
//
// fs.writeFileSync('./logo2.png', img1);

let res = fs.readFileSync('./server.js', 'utf8');

let flag = fs.writeFileSync('./server2.js', res, 'utf8');

// function copy(start, target) {
//     let flag = fs.existsSync(start);
//     if(flag) {
//         let res = fs.readFileSync(start);
//         fs.writeFileSync(target, res);
//     }
// }
// copy('./user.json', './user2.json');