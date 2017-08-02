window.Event = (function () {
    // 订阅 注册
    function on(ele, type, fn) {
        var events = ele['self' + type];
        if(!(events instanceof Array)) {
            events = ele['self' + type] = [];
        }

        for(var i = 0; i < events.length; i++) {
            if(events[i] === fn) return;
        }
        events.push(fn);
    }
    // fire 发布
    function fire(ele, type) {
        var events = ele['self' + type];
        if(events instanceof Array) {
            for(var i = 0; i < events.length; i++) {
                events[i].call(ele);
            }
        }

    }
    // off 退订
    function off(ele, type, fn) {
        var events = ele['self' + type];
        if(events instanceof Array) {
            for(var i = 0; i < events.length; i++) {
                if(events[i] === fn) {
                    events.splice(i, 1);
                    return;
                }
            }
        }
    }

    return {
        on: on,
        fire: fire,
        off: off
    }
})();