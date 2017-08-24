~(function () {
// 创建ajax实例
    function createXhr() {
        let xhr = null;
        let ary = [function () {
            return new XMLHttpRequest();
        }, function () {
            return new ActiveXObject('Microsoft.XMLHTTP');
        }, function () {
            return new ActiveXObject('Msxml2.XMLHTTP');
        }, function () {
            return new ActiveXObject('Msxml3.XMLHTTP');
        }];
        for (let i = 0; i < ary.length; i++) {
            try {
                let createFn = ary[i];
                xhr = createFn();
                createXhr = createFn;
                break;
            } catch (e) {

            }
        }
        if (!xhr) {
            throw new Error('请升级浏览器');
        }
        return xhr;
    }

// 封装ajax
    function ajax(options) {
        // 默认参数对象
        let _defaultOptions = {
            url: null,
            type: 'GET',
            cache: true, // 有缓存 false 不需要缓存
            async: true,
            dataType: 'text',
            data: null,
            success: null,
            timeout: null,
            error: null
        };

        // 合并参数对象
        for (let k in options) {
            if (options.hasOwnProperty(k)) {
                _defaultOptions[k] = options[k]
            }
        }

        // 处理参数属性
        // 如果是get请求 cache data
        if (_defaultOptions.type.toLocaleLowerCase() === 'get') {

            // 如果当前url后面有问号 直接从末尾去掉
            if (_defaultOptions.url.indexOf('?') > -1) {
                _defaultOptions.url = _defaultOptions.url.slice(0, -1)
            }

            // 缓存问题
            // 不需要缓存 的时候 拼接时间戳
            if (!_defaultOptions.cache) {
                _defaultOptions.url += '?_=' + Date.now();
            }

            // 拼接传输的后台参数
            let params = _defaultOptions.data;
            for (let k in params) {
                if (params.hasOwnProperty(k)) {
                    let val = params[k];
                    if (_defaultOptions.url.indexOf('?') > -1) {
                        _defaultOptions.url += '&' + k + '=' + val;
                    } else {
                        _defaultOptions.url += '?' + k + '=' + val;
                    }
                }
            }

        }

        // 1.创建ajax实例
        let xhr = createXhr();
        xhr.open(_defaultOptions.type, _defaultOptions.url, _defaultOptions.async);

        xhr.responseType = _defaultOptions.dataType; // 预期返回内容类型

        if(_defaultOptions.async) {
            xhr.timeout = _defaultOptions.timeout; // 设置超时时间
            xhr.ontimeout = _defaultOptions.error; // timeout事件
            xhr.onerror = _defaultOptions.error; // error事件
        }

        xhr.onreadystatechange = function () {
            if(this.readyState === 4 && /^2\d{2}$/.test(this.status)) {
                typeof _defaultOptions.success === 'function'? _defaultOptions.success(this.response) : null
            }
        };
        xhr.send(JSON.stringify(_defaultOptions.data)); // 发送请求如果是post请求 将数据放在请求体里
    }

    window.$$ = {ajax};
})();