/**
 * Created by liwenli on 2017/7/8.
 */
var utils = (function () {
    function listToArray(likeAry) {
        try {
            return [].slice.call(likeAry, 0);
        } catch (e) { // 只有try里面报错 才会执行catch里面的
            var newArr = [];
            for (var i = 0; i < likeAry.length; i++) {
                newArr[newArr.length] = likeAry[i];
            }
            return newArr;
        }
    }

    function jsonParse(data) { // 将json字符串转化为json对象兼容写法
        return "JSON" in window ? JSON.parse(data) : eval('(' + data + ')')
    }

    // 获取/设置 文档 盒模型属性
    function win(attr, val) {
        if(typeof val === 'undefined'){ // 获取
            return document.documentElement[attr] || document.body[attr]
        }
        // 设置
        document.documentElement[attr] = val;
        document.body[attr] = val;
    }

    // 获取元素距离body的偏移
    function offset(ele) {
        var l = ele.offsetLeft;
        var t = ele.offsetTop;
        var p = ele.offsetParent;
        while (p) {
            // navigator.userAgent 查看客户端版本信息
            // IE 8 默认含边框  不是IE8 需要加边框
            if (navigator.userAgent.indexOf('MSIE 8.0') === -1) {
                l += p.clientLeft;
                t += p.clientTop;
            }
            l += p.offsetLeft;
            t += p.offsetTop;
            p = p.offsetParent;
        }

        return {left: l, top: t};
    }
    return {
        listToArray: listToArray,
        jsonParse: jsonParse,
        win: win,
        offset: offset
    }
})();