~(function () {
    // 获取操作元素
    var outer = document.getElementById('outer');
    var inner = document.getElementById('inner');
    var focus = document.getElementById('focus');
    var oImgs = inner.getElementsByTagName('img');
    var focusList = focus.getElementsByTagName('li');

    // 获取到左右切换按钮
    var btns = outer.getElementsByTagName('a');
    var left = btns[0];
    var right = btns[1];

    // 一张图片的宽度 视口的宽度
    var wid = outer.clientWidth;
    // 图片个数
    var len = oImgs.length;

    // 图片平移到第几张 left怎么算
    // 此时的left值 = 这张图片索引 * 负的一张图片的宽度

    // 定时器主要是用来控制 每隔一段时间 准备开始切换到下一张
    var step = 0; // 记录当前图片索引 默认是第一张图片的索引
    // 再给动画元素 定义定时器属性时 注意：animate里会给动画元素自动添加个属性ele._timer的定时器

    // 自动轮播
    inner.timer = setInterval(autoMove, 2000);

    // autoMove 执行一次 就会切换一次 所以 切换图片 主要是控制autoMove
    function autoMove(n) { // n 传递索引是几 step = n 就让当前切换到 索引为n的那张图片位置
        // step++; // 当前要切换到的那张图片的索引
        !isNaN(n)? step = n : step++;
        // utils.css(inner, 'left', step * -wid);
        // 如果此时要切换到的那张图片 索引 大于最后一张索引的时候
        if (step > len - 1) {
            utils.css(inner, 'left', 0); // 立马变成第一张(第一张和最后一张一模一样 在变的过程中看不出来 用户会把最后一行当做第一张)
            step = 1; // 紧接着我们 开始 切换到 第二张
        }
        $animate({
            ele: inner,
            target: {
                left: step * -wid
            },
            duration: 300 // 切换到下一张的过渡动画时间
        });
        changBg(step); // 实现焦点同步
    }

    // step++ 往左平移  step-- 往右平移

    // 左右切换控制
    right.onclick = function () {
        autoMove();
    };
    
    left.onclick = function () {
        step --;
        if(step === -1){
            utils.css(inner, 'left', (len-1) * -wid);
            step = len - 2;
        }
        autoMove(step);
    };

    // 焦点
    for(var i = 0; i < focusList.length; i++){
        var curLi = focusList[i];
        curLi.n = i;
        curLi.onclick = function () {
            changBg(this.n);
            autoMove(this.n);
        }
    }

    // 切换焦点选中样式
    function changBg(n) {
        n >= len - 1? n = 0 : null;
        for(var i = 0; i < focusList.length; i++){
            var oLi = focusList[i];
            i === n ? utils.addClass(oLi, 'select') : utils.removeClass(oLi, 'select');
        }
    }

    // 滑入滑出控制
    outer.onmouseover = function () {
        clearInterval(inner.timer); // 停止轮播
        left.style.display = right.style.display = 'block';
    };

    outer.onmouseout = function () {
        inner.timer = setInterval(autoMove, 2000); // 继续轮播
        left.style.display = right.style.display = 'none';
    }


})();


