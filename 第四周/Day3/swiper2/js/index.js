~function () {
    var inner = document.getElementById('inner');
    var focus = document.getElementById('focus');
    var focusList = focus.getElementsByTagName('li');
    var wid = outer.clientWidth;
    var oImgs = inner.getElementsByTagName('img');
    var len;
    var step = 0;

// 获取数据
    function getData(callBack) {
        var xhr = new XMLHttpRequest();
        xhr.open('get', 'data.json');//不写第三个参数默认是异步
        xhr.onreadystatechange = function () {
            if (this.readyState === 4 && /^2\d{2}/.test(this.status)) {
                var data = utils.jsonParse(this.responseText);
                typeof callBack === 'function' ? callBack(data) : null;
            }
        };
        xhr.send()
    }
    getData(bindData);

// 绑定数据
    function bindData(data) {
        /**
         * 开始渲染页面
         */
        var str = '';
        var str2 = '';
        for (var i = 0; i < data.length; i++) {
            var cur = data[i];
            // 拼接图片
            str += '<div>';
            str += '<img real="' + cur.img + '">';
            str += '</div>';

            // 拼接焦点
            str2 += '<li></li>'
        }
        // 为了实现无缝滚动  我们需要在 图片末尾 再拼接一张和第一张一模一样的图片
        str += '<div><img real="' + data[0].img + '"></div>';
        // 将拼接好的 图片和焦点 渲染到页面
        inner.innerHTML = str;
        focus.innerHTML = str2;
        // 让第一个焦点 为选中状态
        focusList[0].className = 'select';


        /**
         * 渲染完页面 然后调用执行相应 功能
         */

        // 获取图片length（注意 由于图片是动态绑定的 需要页面渲染后 才能获取到图片的length）
        len = oImgs.length;
        // 最开始让第一张和最后一张 先延迟加载
        delayImg(oImgs[0]);
        delayImg(oImgs[len - 1]);
        // 开始自动轮播
        outer.timer = setInterval(autoMove, 2000);
        // 事件绑定
        bindEvent();
    }


    /**
     * 功能函数 定义部分
     */


// 根据传入参数切换图片，如不传则按照全局step控制
    function autoMove(n) {
        // 当前要切换到的图片索引
        !isNaN(n) ? step = n : step++;
        // utils.css(inner, 'left', step * -wid);
        if (step === len) {
            utils.css(inner, 'left', 0); // 当切换图片已经到头时 立马变为第一张
            step = 1; // 紧接着 让此时的动画 切换到第二张
        }

        $animate({
            ele: inner,
            target: {
                left: step * -wid
            },
            effect: ['Bounce', 'easeInOut'],
            duration: 300,
            callBack: function () {
                var cur = oImgs[step];
                if (cur.flag) return;
                delayImg(cur); // 每次切换的图片进行加载
            }
        });

        changeBg(step) // 控制焦点选中状态
    }

// 图片延时加载
    function delayImg(img) {
        var imgSrc = img.getAttribute('real');
        var temp = new Image;
        temp.src = imgSrc;
        temp.onload = function () {
            img.src = imgSrc;
            img.flag = true;
            //渐变处理（透明度）
            $animate({
                ele: img,
                target: {
                    opacity: 1
                },
                duration: 300
            });
            temp = null
        };
        temp.onerror = function () {
            img.flag = true;
        }
    }

// 焦点选中状态控制
    function changeBg(n) {
        n === len - 1 ? n = 0 : null;//处理多余出来最后一张图片。
        for (var j = 0; j < focusList.length; j++) {
            j === n ? utils.addClass(focusList[j], 'select') : utils.removeClass(focusList[j], 'select')
        }
    }

// 绑定所有事件
    function bindEvent() {
        //绑定焦点点击事件
        for (var i = 0; i < focusList.length; i++) {
            var cur = focusList[i];
            cur.n = i;
            cur.onclick = function () {
                autoMove(this.n);
            }
        }
        //绑定左右点击事件
        right.onclick = function () {
            autoMove();
        };
        left.onclick = function () {
            step--;
            if (step === -1) {
                utils.css(inner, 'left', (len - 1) * -wid);
                step = len - 2;

            }
            autoMove(step);
        };


        //绑定移入移出轮播图的滑动事件
        outer.onmouseover = function () {
            clearInterval(this.timer);
            right.style.display = left.style.display = 'block';
        };

        outer.onmouseout = function () {
            this.timer = setInterval(autoMove, 2000);
            right.style.display = left.style.display = 'none';
        };

    }
}();