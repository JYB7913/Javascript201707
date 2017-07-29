~function () {
    /*  调用顺序
     new Swiper =>getEles => getData => bindData(delayImg, autoMove(自),        bindEvent);
     autoMove => (delayImg, changeBg)
     */

    // this预处理
    Function.prototype.$bind = function (context) {
        var that = this;
        var params = [].slice.call(arguments, 1);
        return function () {
            that.apply(context, params);
        }
    };

    window.Swiper = function (ele, options) {
        this.ele = document.getElementById(ele); // 获取最外层容器
        this.data = options.data;
        this.interval = options.interval || 2000;
        this.duration = options.duration || 300;
        this.getEles(); // 获取操作元素
    };

    Swiper.prototype.getEles = function () { // this 是实例
        var that = this;
        var ele = that.ele;
        that.inner = ele.getElementsByTagName('div')[0]; // 获取inner
        that.focus = ele.getElementsByTagName('ul')[0]; // 获取focus
        var oBtns = ele.getElementsByTagName('a'); // 获取左右切换按钮
        that.left = oBtns[0];
        that.right = oBtns[1];
        that.focusList = that.focus.getElementsByTagName('li'); // 获取所有焦点
        that.oImgs = that.inner.getElementsByTagName('img'); // 获取到所有图片
        that.wid = ele.clientWidth; // 获取视口宽度
        that.step = 0; // 记录当前图片索引

        that.getData(); // 开始获取数据
    };

    // 获取数据
    Swiper.prototype.getData = function () { // this 是当前实例
        var that = this; // 缓存实例this
        var xhr = new XMLHttpRequest();
        xhr.open('get', that.data);//不写第三个参数默认是异步
        xhr.onreadystatechange = function () {
            if (this.readyState === 4 && /^2\d{2}/.test(this.status)) {
                var data = utils.jsonParse(this.responseText);
                that.bindData(data);
            }
        };
        xhr.send()
    };

    // 绑定数据
    Swiper.prototype.bindData = function (data) { // this 是当前实例
        var that = this; // 缓存实例this
        var innerStr = ''; // 拼接图片
        var focusStr = ''; // 拼接焦点
        for (var i = 0; i < data.length; i++) {
            var cur = data[i];
            innerStr += '<div><img real=' + cur.img + ' alt=""></div>';
            focusStr += '<li></li>'
        }
        innerStr += '<div><img real=' + data[0].img + ' alt=""></div>';
        // 将拼接好的html字符串 输出渲染到页面
        that.inner.innerHTML = innerStr;
        that.focus.innerHTML = focusStr;
        utils.addClass(that.focusList[0], 'select');
        that.len = that.oImgs.length;

        // 延迟加载（第一张和最后一张）
        that.delayImg(that.oImgs[0]);
        that.delayImg(that.oImgs[that.len - 1]);

        // 执行自动轮播(注意autoMove中this需要预处理)
        // that.timer = setInterval(function () {
        //     that.autoMove();
        // }, 2000);
        // that.timer = setInterval(that.autoMove.bind(that), 2000)
        that.timer = setInterval(that.autoMove.$bind(that), that.interval);

        // 进行事件绑定
        that.bindEvent();
    };

    // 图片切换控制(注意 调用autoMove的时候 需要保证里面this 是当前实例 因为 里面很多属性       需要当前实例提供)
    Swiper.prototype.autoMove = function (n) { // this 是当前实例

        var that = this;
        // 如果当前传入了索引 就以传入的索引为主 否则默认执行that.step++ 也就是切换到下一张
        !isNaN(n) ? that.step = n : that.step++; //  that.step++当前要切换到的图片索引

        if (that.step === that.len) { // 最大边界判断 大于最后一张索引时
            utils.css(that.inner, 'left', 0); // 立马变到第一张
            that.step = 1; // 紧接着从第二张开始轮播
        }
        $animate({
            ele: that.inner,
            target: {
                left: that.step * -that.wid
            },
            duration: that.duration,
            callBack: function () {
                var cur = that.oImgs[that.step];
                if (cur.flag) return; // 防止重复加载
                that.delayImg(cur); // 轮播时的加载
            }
        });
        that.changBg(that.step); // 焦点同步 选中相应焦点
    };

    // 图片延时加载
    Swiper.prototype.delayImg = function (img) {
        var that = this;
        var imgSrc = img.getAttribute('real'); // 获取到自身保存真实图片地址
        // 检测图片有效性
        var temp = new Image;
        temp.src = imgSrc;
        temp.onload = function () {
            // 加载渐变效果
            img.src = imgSrc;
            img.flag = true;
            $animate({
                ele: img,
                target: {
                    opacity: 1
                },
                duration: that.duration
            });
        }
    };

    // 事件绑定
    Swiper.prototype.bindEvent = function () { // this 是当前实例
        var that = this;

        // 焦点循环绑定事件
        for (var i = 0; i < that.focusList.length; i++) {
            var cur = that.focusList[i];
            cur.n = i;
            cur.onclick = function () {
                that.autoMove(this.n);
            }
        }

        // 滑入滑出控制
        that.ele.onmouseover = function () { // 停止轮播
            clearInterval(that.timer);
            that.left.style.display = that.right.style.display = 'block';
        };

        that.ele.onmouseout = function () { // 继续轮播
            that.timer = setInterval(that.autoMove.$bind(that), that.interval);
            that.left.style.display = that.right.style.display = 'none';
        };

        // 左右切换控制
        that.right.onclick = function () { // 切换到下一张
            that.autoMove(); // autoMove this就是当前实例that
        };
        // that.right.onclick = that.autoMove; // autoMove this就是 当前事件元素（that.right）
        that.left.onclick = function () { // 切换到上一张
            that.step--;
            if (that.step === -1) { // 最小边界判断处理
                // 立马由第一张 变为 倒数第一张
                utils.css(that.inner, 'left', (that.len - 1) * -that.wid);
                // 紧接着 从倒数第二张 开始轮播
                that.step = that.len - 2;
            }
            that.autoMove(that.step);
        }
    };

    // 焦点选中状态切换
    Swiper.prototype.changBg = function (n) {
        var that = this;
        n === that.len - 1 ? n = 0 : null; // 如果是最后一张索引 应该让第一个li选中
        for (var i = 0; i < that.focusList.length; i++) {
            var cur = that.focusList[i];
            i === n ? utils.addClass(cur, 'select') : utils.removeClass(cur, 'select');
        }
    };

//
//
//     /**
//      * 功能函数 定义部分
//      */
//
//
// // 根据传入参数切换图片，如不传则按照全局step控制
//     function autoMove(n) {
//         // 当前要切换到的图片索引
//         !isNaN(n) ? step = n : step++;
//         // utils.css(inner, 'left', step * -wid);
//         if (step === len) {
//             utils.css(inner, 'left', 0); // 当切换图片已经到头时 立马变为第一张
//             step = 1; // 紧接着 让此时的动画 切换到第二张
//         }
//
//         $animate({
//             ele: inner,
//             target: {
//                 left: step * -wid
//             },
//             effect: ['Bounce', 'easeInOut'],
//             duration: 300,
//             callBack: function () {
//                 var cur = oImgs[step];
//                 if (cur.flag) return;
//                 delayImg(cur); // 每次切换的图片进行加载
//             }
//         });
//
//         changeBg(step) // 控制焦点选中状态
//     }
//

//
// // 焦点选中状态控制
//     function changeBg(n) {
//         n === len - 1 ? n = 0 : null;//处理多余出来最后一张图片。
//         for (var j = 0; j < focusList.length; j++) {
//             j === n ? utils.addClass(focusList[j], 'select') : utils.removeClass(focusList[j], 'select')
//         }
//     }
//
// // 绑定所有事件
//     function bindEvent() {
//         //绑定焦点点击事件
//         for (var i = 0; i < focusList.length; i++) {
//             var cur = focusList[i];
//             cur.n = i;
//             cur.onclick = function () {
//                 autoMove(this.n);
//             }
//         }
//         //绑定左右点击事件
//         right.onclick = function () {
//             autoMove();
//         };
//         left.onclick = function () {
//             step--;
//             if (step === -1) {
//                 utils.css(inner, 'left', (len - 1) * -wid);
//                 step = len - 2;
//
//             }
//             autoMove(step);
//         };
//
//
//         //绑定移入移出轮播图的滑动事件
//         outer.onmouseover = function () {
//             clearInterval(this.timer);
//             right.style.display = left.style.display = 'block';
//         };
//
//         outer.onmouseout = function () {
//             this.timer = setInterval(autoMove, 2000);
//             right.style.display = left.style.display = 'none';
//         };
//
//     }
}();