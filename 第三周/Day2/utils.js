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

    // 获取/设置 document文档 盒模型属性
    function win(attr, val) {
        if (typeof val === 'undefined') { // 获取
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

        while (p.nodeName !== "BODY") {
            if (navigator.userAgent.indexOf("MSIE 8.0") === -1) {
                l += p.clientLeft;
                t += p.clientTop;
            }
            l += p.offsetLeft;
            t += p.offsetTop;
            p = p.offsetParent;
        }
        return {
            left: l,
            top: t
        }
    }


    /**
     * getCss 获取样式
     * @param curEle  当前元素
     * @param attr 样式属性
     * @returns {Number|String} 获取的样式值
     */
    function getCss(curEle, attr) {
        var val;
        var reg;
        if ("getComputedStyle" in window) {
            val = window.getComputedStyle(curEle, null)[attr];
        } else { // IE Low filter
            if (attr === 'opacity') {
                // 'alpha(opacity=10)'
                val = curEle.currentStyle['filter'];
                reg = /alpha\(opacity=((?:\d|[1-9]\d+)(?:\.\d+)?)\)/;
                var temp = reg.exec(val);
                // 确保有没有捕获到 如果捕获到就 得到第一个分组内容 否则返回默认值 1
                val = temp ? temp[1] / 100 : 1;
            } else {
                val = curEle.currentStyle[attr];
            }
        }
        //去掉样式值的单位 比如10px 8em 19rem 0.3 获取到的样式值 都是字符串 block red
        reg = /^[+-]?(\d|[1-9]\d+)(\.\d+)?(px|em|rem|pt)?$/;
        return reg.test(val) ? parseFloat(val) : val;
    }

    /**
     * setCss 设置元素样式
     * @param curEle 当前元素
     * @param attr 样式属性
     * @param val  样式值
     */
    function setCss(curEle, attr, val) {
        if (attr === 'opacity') {
            curEle.style[attr] = val;
            curEle.style['filter'] = 'alpha(opacity=' + val * 100 + ')';
            return;
        }

        if (attr === 'float') {
            curEle.style.cssFloat = val;
            curEle.style.styleFloat = val;
            return;
        }

        // 如果是以下属性 需要 自动添加单位
        var reg = /^width|height|left|top|right|bottom|fontSize|((margin|padding)(Left|Right|Top|Bottom)?)$/;
        if (reg.test(attr)) {
            if (!isNaN(val)) {
                val += 'px';
            }
        }
        curEle.style[attr] = val;
    }

    /**
     * css 单独/批量设置样式
     * @param curEle 当前元素
     * @param attr {String|Object} 样式属性
     * @param val  样式值
     */
    function css(curEle, attr, val) {
        if (typeof attr === 'object') {
            for (var k in attr) {
                setCss(curEle, k, attr[k]);
            }
        } else {
            setCss(curEle, attr, val);
        }
    }

    return {
        listToArray: listToArray,
        jsonParse: jsonParse,
        win: win,
        offset: offset,
        getCss: getCss,
        setCss: setCss,
        css: css
    }
})();