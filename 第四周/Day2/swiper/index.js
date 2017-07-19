~function () {
    // 获取操作元素
    var outer = document.getElementById('outer');
    var inner = document.getElementById('inner');
    var oImgs = inner.getElementsByTagName('img');
    // 图片个数
    var len = oImgs.length;
    // 获取一张的宽度
    var wid = outer.clientWidth;
    var step = 0; // 记录索引
    inner.timer = setInterval(function () {
       step++;
       if(step === len){ // 如果超出索引范围就从0开始
           utils.css(inner, 'left', 0); // 如果此时到达最后一张（和第一张一模一样的）后里面变成第一张
           // 紧接着让 动画 从第一张平移到第二张
           step = 1;
           // clearInterval(inner.timer);
           // return;
           // step = 0;
       }
       $animate({
           ele: inner,
           target: {
               left: step * -wid
           },
           duration: 300
       })
    }, 2000);

    // inner.timer = setInterval(function () {
    //     step--;
    //     if (step === -1) {
    //         utils.css(inner, 'left', (oImgs.length - 1) * -wid); // 立马变成和第一张一模一样的最后一张
    //         step = oImgs.length - 2; // 紧接着 从最后一张平移到倒数第二张
    //     }
    //     $animate({
    //         ele: inner,
    //         target: {
    //             left: step * -wid
    //         },
    //         duration: 300
    //     })
    // }, 2000)


}();