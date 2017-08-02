~function () {
    function Drag(id) { // 类中this当前实例
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

    Drag.prototype = {
        constructor: Drag,
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
        if(this.prevSpeed){
            this.step = e.clientX - this.prevSpeed; // 用当前的位置减去上一次所在位置 就是 两点间的 步长
            this.prevSpeed = e.clientX; // 在把此时位置 作为下次的 （起始位置）上一次位置
        } else { // 如果没有上一次位置 就把这一次作为 上一次位置
            this.prevSpeed = e.clientX; // 第一次执行move时候没有上一次的 就把第一次作为 上一次位置
        }
    }

    // 结束拖拽
    function up() {
        document.onmousemove = null;
        document.onmouseup = null;
        this.style.zIndex = 0;
        // 发布
        Event.fire(this, 'fly');
        Event.fire(this, 'drop');
        this.prevSpeed = null;  // 把这一次的拖拽 保存 上一次位置 清空 为了 不影响 每次拖拽的速度步长
    }



    // 预处理this关键字
    function handleThis(context, fn) {
        return function (e) {
            fn.call(context, e)
        }
    }

    window.$Darg = Drag;
    // 左右反弹
     window.fly= function () {
        clearTimeout(this.timer); // 清除上一次的定时器
        this.step *= 0.98; // 拖拽后的速度 进行衰减

        // 边界反弹运动处理
        var total = this.offsetLeft + this.step;
        if(total >= this.maxL) {
            total = this.maxL; // 如果到达最大边界 让它由 最大边界 开始 反方向运动 （让它递减步长）
            this.step *= -1; // 变成负值
        } else if(total < 0){ // 如果到达最小边界 让它由 最小边界 开始 反方向运动 （让它递增步长）
            total = 0;
            this.step *= -1; // 变成正数
        }

        this.style.left =  total +'px';

        if(Math.abs(this.step) > 0.5) { //结束条件 根据速度绝对值来进行判断
            this.timer = setTimeout(handleThis(this, fly), 25);
        }

    };

    // 自由落体
    window.drop = function() {
        clearTimeout(this.dropTime);
        if(this.dropSpeed) {
            this.dropSpeed += 8;
        } else {
            this.dropSpeed = 2; // 初始速度
        }

        this.dropSpeed *= 0.98;
        var t = this.offsetTop + this.dropSpeed;
        // 只要到达边界就++
        if(t >= this.maxT) { // 到达最大边界 才会执行 ++
            t = this.maxT;
            this.dropSpeed *= -1;
            this.flag ++;
            console.log('最大边界: ' + this.flag);
        } else { // 如果此时没有再最大边界 就是反弹过程中 就是 设为 0
            // 只要离开边界 就设为0
            this.flag = 0;
            console.log(this.flag);
        }
        this.style.top = t +'px';
        // 如果当前物体始终停止最大边界 就会 一直累加下去
        if(this.flag < 2) {
            this.dropTime = setTimeout(handleThis(this, drop), 25);
        }

    }
}();