function on(ele, type, handle) {
    var events = null;
    if (/^self/.test(type)) { // 添加自定义事件
        events = ele[type];
        if (!(events instanceof Array)) {
            events = ele[type] = [];
        } else {
            for (var i = 0; i < events.length; i++) {
                if (events[i] === handle) return;
            }
        }
        events[events.length] = handle;

    } else if (ele.addEventListener) { // DOM2级事件绑定
        ele.addEventListener(type, handle, false);
    } else {
        events = ele['bind' + type];
        if (!(events instanceof Array)) {
            events = ele['bind' + type] = [];
            ele.attachEvent('on' + type, function (e) {
                fire.call(ele, e);
            });
        } else {
            for (var i = 0; i < events.length; i++) {
                if (events[i] === handle) return;
            }
        }
        events[events.length] = handle;
    }
}

function off(ele, type, fn) {
    var events;
    if (/^self/.test(type)) {
        events = ele[type];
        if (events && events.length) {
            for (var i = 0; i < events.length; i++) {
                if (events[i] === fn) {
                    events.splice(i, 1);
                    break;
                }
            }
        }

    } else if (ele.removeEventListener) {
        ele.removeEventListener(type, fn, false);
    } else {
        events = ele['bind' + type];
        if (events && events.length) {
            for (var i = 0; i < events.length; i++) {
                if (events[i] === fn) {
                    events.splice(i, 1);
                    break;
                }
            }
        }
    }
}

function emit(ele, type) { // 发布自定义事件
    if (/^self/.test(type)) {
        var events = ele[type];
        for (var i = 0; i < events.length; i++) {
            events[i].call(ele);
        }
    }
}

function fire(e) { // 发布 解决 执行顺序以及事件中 this问题
    e = e || window.event;
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
            typeof fn === 'function' ? fn.call(this, e) : null;
        }
    }

}

function trigger(ele, type) {

}