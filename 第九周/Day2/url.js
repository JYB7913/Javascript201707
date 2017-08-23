let url = require('url');

let reqUrl = '/vote/user?id=2&name=zhufeng';
let urlObj = url.parse(reqUrl, true);
console.log(urlObj);

//
// {
//     protocol: null,
//         slashes: null,
//         auth: null,
//         host: null,
//         port: null,
//         hostname: null,
//         hash: null,
//         search: '?id=2&name=zhufeng',
//         query: { id: '2', name: 'zhufeng' },
//     pathname: '/vote/user',
//         path: '/vote/user?id=2&name=zhufeng',
//         href: '/vote/user?id=2&name=zhufeng'
// }
