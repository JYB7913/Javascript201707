~function () {
   // 获取操作元素
    var outer = document.getElementById('outer');
    var inner = document.getElementById('inner');
    var focus = document.getElementById('focus');
    var left = document.getElementById('left');
    var right = document.getElementById('right');
    var oImgs = inner.getElementsByTagName('img');
    var focusList = focus.getElementsByTagName('li');

    var len = oImgs.length;
    var wid = outer.clientWidth;
    var step = 0; // 记录当前索引
    // 自动轮播
    outer.timer = setInterval(move, 2000);
    function move(n) { // move 只要执行一次就就会切换到下一张
        // step++; // 切换到下一张step ++完后的值 就是 此时要切换到那张图片的索引

        !isNaN(n)? step = n : step++;
        // utils.css(inner, 'left', step * -wid);
        if(step === len){
            // alert('已经没有图片了')
            // step = 0
            utils.css(inner, 'left', 0); // 立马变成第一张
            step = 1 // 紧接着切换到第二张图片
        }
        $animate({
            ele: inner,
            target: {
                left: step * -wid // 要切换到索引为step这张图片的left值 = step * -wid
            },
            duration: 300
        });
      changeBg(step);
    }

    // move 中 step++ 切换到下一张 step-- 切换到上一张
    right.onclick = move;

    left.onclick = function () {
        step--;
        if(step === -1){
            utils.css(inner, 'left', (len-1) * -wid); // 立马变成最后一张
            step = len - 2; // 紧接着从倒数第二张开始
        }
        move(step)
    };

    bindEvent();
    function bindEvent() {
        for(var i = 0; i < focusList.length; i++){
            var cur = focusList[i];
            cur.n = i;
             cur.onclick = function () {
                 move(this.n);
             }
        }
    }
    function changeBg(n) {
        n === len-1? n = 0 : n;
        for(var i = 0; i < focusList.length; i++){
            var cur = focusList[i];
            i === n? utils.addClass(cur, 'select') : utils.removeClass(cur, 'select')
        }
    }
    // 滑入/滑出控制
    outer.onmouseover = function () {
        clearInterval(outer.timer); // 停止轮播
        left.style.display = right.style.display ='block';
    };

    outer.onmouseout = function () { // 继续轮播
        outer.timer = setInterval(move, 2000);
        left.style.display = right.style.display ='none';
    };
    window.move = move;
}();