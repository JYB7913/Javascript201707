$(function () {
    $.extend({
        Banner: Banner
    });
    function Banner(id, options) {
        // 处理默认参数
        var _defaults = {
            interval: 2000,
            focus: true
        };
        $.extend(_defaults, options);
        if (!_defaults.url) {
            console.warn('缺少加载数据!');
            return;
        }
        // 获取容器
        var $swiper = $(id);
        var $imgs;
        var step = 0; // 记录索引
        var len;
        var $focusList;
        var $change;

        getData(_defaults.url);
        // 获取数据
        function getData(url) {
            $.ajax({
                url: url,
                type: 'GET',
                dataType: 'json',
                success: function (res) {
                    // res.length? bindData(res) : null;
                    res.length && bindData(res);
                }
            })
        }

        // 绑定数据
        function bindData(data) {
            var imgStr = '';

            $.each(data, function (ind, item) {
                imgStr += '<img data-real=' + item.img + '>';
            });
            $swiper.append(imgStr); // 将图片输出到页面
            $imgs = $swiper.children('img'); // 获取到所有图片

            if (_defaults.focus) {
                var focusStr = '<ul class="focus">';
                $.each(data, function (ind, item) {
                    focusStr += ind === 0 ? '<li class="active"></li>' : '<li></li>'
                });
                focusStr += '</ul>';
                $swiper.append(focusStr); // 将焦点输出到页面
                $focusList = $swiper.find('.focus>li'); // 获取到所有焦点
            }


            $change = $swiper.find('a.left, a.right');
            len = $imgs.size();
            delay($imgs.eq(0)); // 加载首张
            bindEvent(); // 事件绑定
        }

        // 延迟加载
        function delay($img) {
            var imgSrc = $img.data('real');
            var temp = new Image;
            $(temp).prop('src', imgSrc);
            $(temp).load(function () {
                $img.prop('src', imgSrc).fadeIn(300);
                $img[0].flag = true;
            })
        }

        // 切换
        function move(n) {
            !isNaN(n) ? step = n : step++;
            if (step === len) {
                step = 0
            }
            // 图片切换控制
            $imgs.stop(true, true).eq(step).fadeIn(300, function () {
                if (this.flag) return;
                delay($(this));
            }).siblings('img').fadeOut(300);
            // 焦点选中控制
            if (!_defaults.focus) return;
            $focusList.eq(step).addClass('active').siblings('li').removeClass('active');
        }

        // 自动切换
        $swiper[0].timer = setInterval(move, _defaults.interval);

        function bindEvent() {
            // 滑入滑出控制
            $swiper.hover(function () {
                clearInterval(this.timer);
                $change.show('fast');
            }, function () {
                this.timer = setInterval(move, _defaults.interval);
                $change.hide('fast');
            });

            if (_defaults.focus) {
                $focusList.click(function () {
                    move($(this).index());
                });
            }

            $change.eq(0).click(function () {
                step--;
                if (step === -1) {
                    step = len - 1;
                }
                move(step);
            });
            $change.eq(1).click(move); // 注意move默认会得到一个 事件对象
        }
    }
});
