function on(ele, type, handle) {
    if (ele.addEventListener) {
        ele.addEventListener(type, handle, false);
    } else {
        var events = ele['bind' + type];
        if (!(events instanceof Array)) { // 如果当前时间主题 没有事件池就创建一个
            events = ele['bind' + type] = []; // 给每个主题只分配一个事件池
            ele.attachEvent('on' + type, function (e) { // 给每个主题分配一个发布者
                fire.call(ele, e); // 发布
            });
        } else { // 解决重复绑定
            for (var i = 0; i < events.length; i++) {
                if (events[i] === handle) return;
            }
        }
        events[events.length] = handle; // 添加订阅函数
    }
}
function off(ele, type, handle) {
    if (ele.removeEventListener) {
        ele.removeEventListener(type, handle, false);
    } else {
        var events = ele['bind' + type];
        if (events instanceof Array) {
            for (var i = 0; i < events.length; i++) {
                if (events[i] === handle) {
//                        events.splice(i, 1);
                    events[i] = null; // 预防数组塌陷
                    break;
                }
            }
        }
//            ele.detachEvent('on' + type, handle);
    }

}


function fire(e) { // 发布 解决 执行顺序以及事件中 this问题
//        console.log(this['bind' + e.type]); // 根据事件类型的到事件池
    e.target = e.target || e.srcElement;
    e.preventDefault = e.preventDefault || function () {
            e.returnValue = false;
        };
    e.stopPropagation = e.stopPropagation || function () {
            e.cancelBubble = true;
        };
    e.pageX = e.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft);
    e.pageY = e.clientY + (document.documentElement.scrollTop || document.body.scrollTop);


    var events = this['bind' + e.type];
    if (events instanceof Array) {
        for (var i = 0; i < events.length; i++) {
            var fn = events[i];
            typeof fn === 'function' ? fn.call(this, e) : null; // 将处理函数中this修改为当前事件元素
        }
    }

}
