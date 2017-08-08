function on(ele, type, handle) {
    if (ele.addEventListener) {
        ele.addEventListener(type, handle, false)
    } else {
        var events = ele['bind' + type];
        if (!(events instanceof Array)) {
            events = ele['bind' + type] = [];
            ele.attachEvent('on' + type, function (e) {
                run.call(ele, e);
            })
        }
        for (var i = 0; i < events.length; i++) {
            if (events[i] === handle) return;
        }
        events.push(handle)
    }

}
function off(ele, type, handle) {
    if (ele.removeEventListener) {
        ele.removeEventListener(type, handle, false)
    } else {
        var events = ele['bind' + type];
        if (events instanceof Array) {
            for (var i = 0; i < events.length; i++) {
                if (events[i] === handle) {
                    events[i].splice(i, 1);
                    break;
                }


            }
        }
    }
}
function run(e) {
    console.log(123);
    e = e || window.event;
    e.target = e.target || e.srcElement;
    e.stopPropagation = e.stopPropagation || function () {
            e.cancelBubble = true;
        };
    e.preventDefault = e.preventDefault || function () {
            e.returnValue = false;
        };
    e.pageX = e.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft);
    e.pageY = e.clientY + (document.documentElement.scrollTop || document.body.scrollTop);
    console.log(this === btn);
    var events = this['bind' + e.type];
    console.log(e.type);
    if (events instanceof Array) {

        for (var i = 0; i < events.length; i++) {
            events[i].call(this, e);
        }

    }
}