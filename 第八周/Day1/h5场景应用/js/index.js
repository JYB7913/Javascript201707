$(function () {
    // 初始化 Swiper
   new Swiper('#container', {
       direction: 'vertical',  // 垂直方向
       loop: true, // 无缝衔接,
       onTransitionEnd: function (swiper) {
           // page1 page2  page + 当前页索引  注意 开头和结尾 的两个复制品处理
           let cn = 'page';
           let curInd = swiper.activeIndex; // 当前页的索引
           let slides = swiper.slides; // slides元素集合
           let len = slides.length; // length

           switch (curInd) {
               case len - 1:
                   cn += 1;
                   break;
               case 0:    
                   cn += len-2;
                break;
               default:
                   cn += curInd;  
           }
           slides.eq(curInd).attr('id', cn).siblings().removeAttr('id');
       }
   });
   // 音乐播放
    let audioMusic = $('#audioMusic')[0];
    let $music =  $('.music');
    $(audioMusic).on('canplay', function () {
        audioMusic.play();
        $music.show();
        $music.attr('id', 'music');
    });

    $music.on('click', function () {
        if(audioMusic.paused){
            audioMusic.play();
            $(this).attr('id', 'music');
        } else {
            $(this).removeAttr('id');
            audioMusic.pause();
        }
    })
});