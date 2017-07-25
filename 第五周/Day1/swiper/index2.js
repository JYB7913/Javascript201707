$(function () {
    var $outer = $('#outer');
    var $imgs = $outer.children('img');
    var $left = $outer.find('.left');
    var $right = $outer.find('.right');
    var $oLis = $outer.find('.focus>li');
    var len = $imgs.size();


    // var $imgs = $('#outer>img');
    // var $left = $outer.children('.left');
    // var $right = $outer.children('.right');
    // var $oLis = $('.focus li');

    // 首张加载
    delay($imgs.eq(0));

    //记录当前索引，切换图像
    var step = 0;
    // 轮播
    $outer[0]._timer = setInterval(move, 2000);
    function move(n) {
        !isNaN(n) ? step = n : step++;
        if (step === len) {
            step = 0;
        }
        $imgs.eq(step).fadeIn(300, function () {
            if (this.flag)return;
            delay($(this))
        }).siblings('img').fadeOut(300);
        $oLis.eq(step).addClass('active').siblings('li').removeClass('active');
    }

    // 滑入滑出控制
    $outer.mouseover(function () {
        clearInterval(this._timer);
        $left.fadeIn(300);
        $right.fadeIn(300);
    });
    $outer.mouseout(function () {
        this._timer = setInterval(move, 2000);
        $left.fadeOut(300);
        $right.fadeOut(300);
    });
    // 左右切换
    $left.click(function () {
        step--;
        if (step === -1) {
            step = len - 1;
        }
        move(step)
    });
    $right.click(function () {
        move();
    });
    // 焦点点击
    $oLis.click(function () {
        move($(this).index());
    });

    // 延迟加载
    function delay($img) {
        // var imgSrc = $img.attr('real');
        var imgSrc = $img.data('real');
        console.log(imgSrc);
        var temp = new Image;
        $(temp).prop('src', imgSrc);
        $(temp).load(function () {
            $img.prop('src', imgSrc).fadeIn();
            $img[0].flag = true;
        })
    }
    
    // data 数据存储
    // 在元素上存储数据 data-real data-前缀 real属性名
    $imgs.eq(0).data('say', 123);
    console.log($imgs.eq(0).data('say'));
});