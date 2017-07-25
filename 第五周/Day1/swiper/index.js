$(function () {
    var $imgs = $('#outer>img');
    var $outer = $('#outer');
    var $left = $('#outer .left');
    var $right = $('#outer .right');
    var len = $imgs.size();

    // 加载首张
    delay($imgs.eq(0));
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
        // 图片切换 注意执行新动画先让上次动画清除
        $imgs.stop(true, true).eq(step).fadeIn(300, function () {
            if(this.flag) return; // 防止重复加载
            delay($(this)); // 进行加载
        }).siblings('img').fadeOut(300);
        // 焦点状态同步
        $(".focus li").eq(step).addClass("active").siblings("li").removeClass("active");
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

    // 左右切换
    $right.click(function () {
        if($imgs.is(':animated')) return; // 如果当前正在执行动画 就禁止切换
        move();
    });
    $right.click(move);
    
    $left.click(function () {
        if($imgs.is(':animated')) return;
        step--;
        if (step === -1) {
            step = len - 1;
        }
        move(step)
    });

    // 焦点点击
    $(".focus li").mouseover(function () {
        move($(this).index());
    });

    function delay($img) { // $img jq 对象
        var imgSrc = $img.attr('real');
        var temp = new Image;
        $(temp).prop('src', imgSrc);
        $(temp).load(function () {
            $img.prop('src', imgSrc).fadeIn(300);
            $img[0].flag = true;
        })
    }

});