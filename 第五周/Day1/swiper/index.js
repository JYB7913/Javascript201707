$(function () {
    var $imgs = $('#outer>img');
    var $outer = $('#outer');
    var $left = $('#outer .left');
    var $right = $('#outer .right');
    var len = $imgs.size();

// 轮播
    var step = 0; // 记录当前索引
    // 自动轮播
    $outer[0].timer = setInterval(move, 2000);
    function move(n) {
        // step++; // 加加完后的索引 是 下一张的索引
        !isNaN(n) ? step = n : step++;
        if (step === len) {
            step = 0;
        }
        $imgs.eq(step).fadeIn(300).siblings('img').fadeOut(300);
    }

    // $outer.timer = 100;
    // console.log($outer);
    // console.log($('#outer')); // 生成了一个新jq对象

    // 滑入/滑出控制
    // $outer.mouseover(function () {
    //     clearInterval(this.timer);
    // }).mouseout(function () {
    //     this.timer = setInterval(move, 2000);
    // });

    $outer.hover(function () {
        clearInterval(this.timer);
        $left.fadeIn(300);
        $right.fadeIn(300);
    }, function () {
        this.timer = setInterval(move, 2000);
        $left.fadeOut(300);
        $right.fadeOut(300);
    });

    $right.click(move);
    $left.click(function () {
        step--;
        if (step === -1) {
            step = len - 1;
        };
        move(step)
    })

});