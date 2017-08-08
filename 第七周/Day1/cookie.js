// 根据指定 key 从cookie中获取 value
function getCookie(key) {
    let str = document.cookie;
    let reg = /([^=; ]+)=([^=; ]+)/g;
    let obj = {};
    str.replace(reg, (a, b, c) => obj[b] = c);
    return obj[key];
}

// 根据指定key保存相应value
function setCookie(key, val, date) {
    document.cookie = `${key}=${val}`;
}
