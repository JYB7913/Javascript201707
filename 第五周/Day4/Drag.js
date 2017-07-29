~function () {
    function Darg(id) { // 类中this当前实例
        if (!id) {
            console.warn('未传入有效元素id');
            return;
        }
        var that = this;
        // 将拖拽元素保存给当前实例el属性
        that.el = document.getElementById(id.slice(1));
        // 将mousedown 中this修改为 当前实例
        that.el.onmousedown = that.handleThis(this, init);
    }

    Darg.prototype = {
        constructor: Darg,
        init: init,
        down: down,
        move: move,
        up: up,
        handleThis: handleThis
    };
    // 初始化
    function init(e) { // this 是当前实例
        var that = this;
        that.el.style.zIndex = 10;
        var winW = document.documentElement.clientWidth || document.body.clientWidth;
        var winH = document.documentElement.clientHeight || document.body.clientHeight;
        // 最大边界值
        that.el.maxL = winW - that.el.offsetWidth;
        that.el.maxT = winH - that.el.offsetHeight;

        that.down.call(that.el, e); // 保证down中this是当前元素
        document.onmousemove = that.handleThis(that.el, that.move);
        document.onmouseup = that.handleThis(that.el, that.up);
    }

    // 准备拖拽
    function down(e) { // this 被修改为 拖拽元素
        e = e || window.event;
        // 计算出鼠标按下时在元素中的X轴和Y轴距离
        this.l = e.clientX - this.offsetLeft;
        this.t = e.clientY - this.offsetTop;
    }

    // 开始拖拽
    function move(e) {  // this 被修改为 拖拽元素
        e = e || window.event;
        e.preventDefault ? e.preventDefault() : e.returnValue = false;
        // 元素偏移值 = 移动时的鼠标位置 - 鼠标在元素中位置
        var l = e.clientX - this.l;
        var t = e.clientY - this.t;
        // 边界判断
        if (l < 0) {
            l = 0;
        } else if (l > this.maxL) {
            l = this.maxL;
        }
        if (t < 0) {
            t = 0;
        } else if (t > this.maxT) {
            t = this.maxT;
        }

        this.style.left = l + 'px';
        this.style.top = t + 'px';
    }

    // 结束拖拽
    function up() {
        document.onmousemove = null;
        document.onmouseup = null;
        this.style.zIndex = 0;

    }

    // 预处理this关键字
    function handleThis(context, fn) {
        return function (e) {
            fn.call(context, e)
        }
    }

    window.$Darg = Darg
}();