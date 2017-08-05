function on(ele, type, fn) {
    var events = ele['self' + type]; // ele['selfclick'] ele['selfmouseover']

    if (!(events instanceof Array)) {
        events = ele['self' + type] = [];
    } else {
        // 避免 重复绑定
        for (var i = 0; i < events.length; i++) {
            if (events[i] === fn) return;
        }
    }

    events.push(fn);
}

function fire(ele, type) {
    var events = ele['self' + type]; // 根据主题获取到事件池
    if (events instanceof Array) {
        for (var i = 0; i < events.length; i++) {
            events[i].call(ele);
        }
    }
}

// 取消订阅
function off(ele, type, fn) {
    var events = ele['self' + type];
    if(events instanceof Array) {
        for(var i = 0; i < events.length; i++) {
            if(events[i] === fn) {
                events.splice(i, 1);
                break;
            }
        }
    }
}