/**
 * Created by liwenli on 2017/7/6.
 */
var utils = (function () {
    function likeToArray(likeArray) {
        try {
            return [].slice.call(likeArray, 0)
        } catch (e) {
            var arr = [];
            for (var i = 0; i < likeArray.length; i++) {
                arr.push(likeArray[i]);
            }
            return arr;
        }
    }

    function jsonParse(jsonStr) {
        return "JSON" in window ? JSON.parse(jsonStr) : eval('(' + jsonStr + ')');
    }

    return {
        likeToArray: likeToArray,
        jsonParse: jsonParse
    }
})();