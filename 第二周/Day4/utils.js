/**
 * Created by liwenli on 2017/7/8.
 */
var utils = (function () {
    function listToArray(likeAry) {
        try{
            return [].slice.call(likeAry, 0);
        }catch (e) { // 只有try里面报错 才会执行catch里面的
            var newArr = [];
            for(var i = 0; i < likeAry.length; i++){
                newArr[newArr.length] = likeAry[i];
            }
            return newArr;
        }
    }

    return {
        listToArray: listToArray
    }
})();