~(function () {
    // 对象合并
    Object.objAssign = function (tar, source) {
        for (let k in source) {
            if (source.hasOwnProperty(k)) {
                tar[k] = source[k];
            }
        }
    };

    // 创建ajax实例
    function getXhr() {
        let arrFn = [function () {
            return new XMLHttpRequest();
        }, function () {
            return new ActiveXObject('Microsoft.XMLHTTP');
        }, function () {
            return new ActiveXObject('Msxml2.XMLHTTP');
        }, function () {
            return new ActiveXObject('Msxml3.XMLHTTP');
        }];
        let curFn = null, xhr = null;
        for (let i = 0; i < arrFn.length; i++) {
            curFn = arrFn[i];
            try {
                xhr = curFn();
                getXhr = curFn;
                break;
            } catch (e) {
            }
        }
        if (!xhr) {
            throw new Error('版本太低，请升级浏览器~');
        }
        return xhr;
    }

    /**
     *
     * @param options  参数对象
     */
    function ajax(options) {
        let _options = { // 默认参数对象
            url: null,
            type: 'GET',
            cache: true,
            context: null,
            async: true,
            data: null,
            dataType: 'text',
            success: null,
            timeout: null,
            error: null
        };
        // 将传递进来options 和默认_options 进行合并
        Object.objAssign(_options, options);

        if (!_options.url) {
            console.warn('缺少url');
            return;
        }

        // 如果url有问号 直接去掉
        if (_options.url.indexOf('?') > -1) {
            _options.url = _options.url.slice(0, -1);
        }

        // GET 方式中 需要单独处理 cache缓存问题  data 发送给后台的数据
        let flag = false;
        if (_options.type.toUpperCase() === 'GET') {
            if (!_options.cache) { // 不需要缓存时 拼接时间戳
                _options.url += '?_=' + Date.now();
                flag = true;
            }
            // url?_=123123
            // url ?id=25   
            // 拼接查询参数query
            for (let k in _options.data) {
                if (_options.data.hasOwnProperty(k)) {
                    if (flag) { // 有？不需要再拼接 直接开头拼接&
                        _options.url += '&' + k + '=' + _options.data[k];
                    } else {
                        _options.url += '?' + k + '=' + _options.data[k];
                        flag = true;
                    }
                }
            }
        }

        // 创建ajax实例
        let xhr = getXhr();
        let {url, type, async, data, dataType, timeout, error, success, context} = _options;
        context || (context = _options); // 回调函数中上下文处理
        xhr.open(type, url, async);
        xhr.responseType = dataType;
        xhr.timeout = timeout;
        xhr.onerror = xhr.ontimeout = error;
        xhr.onreadystatechange = function () {
            if(this.readyState === 4 && /^2\d{2}$/.test(this.status)) {
                typeof success === 'function'? success.call(context, this.response) : null;
            }
        };
        xhr.send(JSON.stringify(data));
    }
    window.$$ = {ajax};
})();