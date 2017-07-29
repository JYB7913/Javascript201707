// 获取操作元素
var outer = document.getElementById('outer');
var inner = document.getElementById('inner');
var focus = document.getElementById('focus');
var focusList = focus.getElementsByTagName('li');
var left = document.getElementById('left');
var right = document.getElementById('right');
var oImgs = inner.getElementsByTagName('img');
// 轮播图片length
var len = oImgs.length;
// 获取轮播视口的宽度
var wid = outer.clientWidth;
// 第一张和最后一张图片加载
delayImg(oImgs[0]);
delayImg(oImgs[len - 1]);

// 图片轮播
var step = 0; // 记录当前图片索引   1 - 2  0 to -700
outer.timer = setInterval(autoMove, 2000);

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

    changeBg(step)
}

// 左右切换
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

// 滑入滑出控制
outer.onmouseover = function () {
    clearInterval(this.timer);
    utils.css(right, 'display', 'block');
    utils.css(left, 'display', 'block');
};

outer.onmouseout = function () {
    this.timer = setInterval(autoMove, 2000);
    utils.css(right, 'display', 'none');
    utils.css(left, 'display', 'none');
};

for (var i = 0; i < focusList.length; i++) {
    var cur = focusList[i];
    cur.n = i;
    cur.onclick = function () {
        autoMove(this.n);
    }
}

function changeBg(n) {
    n === len - 1 ? n = 0 : null;
    for (var j = 0; j < focusList.length; j++) {
        j === n ? utils.addClass(focusList[j], 'select') : utils.removeClass(focusList[j], 'select')
    }
}

function delayImg(img) {
    var imgSrc = img.getAttribute('real');
    var temp = new Image;
    temp.src = imgSrc;
    temp.onload = function () {
        img.src = imgSrc;
        img.flag = true;
        $animate({
            ele: img,
            target: {
                opacity: 1
            },
            duration: 300
        })
    };
    temp.onerror = function () {
        img.flag = true;
    }
}

