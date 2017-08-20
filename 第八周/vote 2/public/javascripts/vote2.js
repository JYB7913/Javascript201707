$(function () {
    let url = window.location.href;
    let regIndex = /index/;
    let regRegister = /register/;
    //  API
    const REQ_API = {
        // http://localhost:8090/vote/index/data?limit=10&offset=0
        indexUrl: '/vote/index/data', // 首页加载数据api
        loginUrl: '/vote/index/info',
        registerUrl: '/vote/register/data'
    };
    // 工具方法
    let utilsObj = {
        // localStorage 操作
        // 获取localStorage
        getStorage(key) {
            return JSON.parse(localStorage.getItem(key));
        },
        // 设置localStorage
        setStorage(key, val) {
            localStorage.setItem(key, JSON.stringify(val));
        },
        // 移除localStorage
        removeStorage(key) {
            localStorage.removeItem(key);
        },
        // 绑定首页列表数据
        indexListRender(data) {
            let $container = $('#container');
            let $lists = $container.find('.lists');
            let str = ``;
            $.each(data, (ind, item) => {
                str += `
              <li>
                <div class="head">
                    <a href="/vote/detail?id=${item.id}">
                        <img src="${item.head_icon}" alt="">
                    </a>
                </div>
                <div class="desc">
                    <a href="/vote/detail?id=${item.id}">
                        <p>
                            <span class="username">${item.username}</span>
                            <span>|</span>
                            <span class="userId">编号#${item.id}</span>
                        </p>
                        <p>${item.description}</p>
                    </a>
                </div>
                <div class="vote">
                    <span>${item.vote}票</span>
                    <div class="voteBtn">投TA一票</div>
                </div>
            </li>
               
               `
            });
            $lists.append(str);
        },

        // 登录请求
        indexBindEvent() { // 首页事件绑定
            let $container = $('#container');
            let $mask = $('#mask');
            let $userLogin = $mask.find('.userLogin'); // 未登录时状态框
            let $userLogined = $mask.find('.userLogined'); // 登录后的状态框
            let $signIn = $container.find('.sign_in');
            let $submitBtn = $mask.find('.submitBtn');
            let $usernum = $userLogin.find('.usernum');
            let $userpassword = $userLogin.find('.userpassword');
            let $logoutBtn = $userLogined.find('.logoutBtn');

            let {getStorage, setStorage, removeStorage} = utilsObj;

            // 用户登录
            $submitBtn.click(function () {
                let id = $usernum.val();
                let password = $userpassword.val();
                let {loginUrl} = REQ_API;
                let reg = /^\s*$/g;
                if (reg.test(id) || reg.test(password)) {
                    alert('请将信息填写完整！');
                    return;
                }
                $.ajax({
                    url: loginUrl,
                    type: 'POST',
                    data: {
                        id, // id: id
                        password  // password: password
                    },
                    dataType: 'json',
                    success(res) {
                        if (res.errno === 0) { // 登录成功并重新加载页面
                            setStorage('voteUser', res.user);
                            alert('登录成功！');
                            window.location.reload();
                            // window.location.href = url;
                        } else { // 未登录成功
                            alert(res.msg);
                        }
                    }
                })


            });
            // 退出登录
            $logoutBtn.click(function () {
                removeStorage('voteUser');
                $mask.hide();
            });

            // 登录框显示事件
            $signIn.click(function () {
                let voteUser = getStorage('voteUser'); // 获取本地存储的登录用户信息
                $mask.show(); // 控制弹窗显示
                if (voteUser) { // 如果存在 说明 已登录状态
                    $userLogined.find('.username').html(voteUser.username);
                    $userLogin.hide();
                    $userLogined.show();
                    return;
                }
                // 未登录状态
                $userLogin.show();
                $userLogined.hide();


            });
            $mask.on('touchmove', (e) => { // 防止滚动穿透
                e.preventDefault();
            });
            $mask.click(function (e) { // 点击遮罩层自身隐藏
                let tar = e.target;
                if (tar.id === 'mask') {
                    $(this).hide();
                }
            });

        }

    };


    if (regIndex.test(url)) {
        utilsObj.indexBindEvent(); // 绑定事件
        $.ajax({
            url: REQ_API.indexUrl,
            type: 'GET',
            data: { // 发送给后台的数据 limit=10&offset=0
                limit: 10,
                offset: 0
            },
            dataType: 'json',
            success(res) {
                if (res.errno === 0) {
                    utilsObj.indexListRender(res.data.objects);
                }
            }
        })

    } else if (regRegister.test(url)) {
        let $registerContainer = $('#registerContainer');
        let $submitBtn = $registerContainer.find('.submitBtn');
        let $formInfo = $registerContainer.find('.formInfo');
        let $username = $formInfo.find('#username');
        let $password1 = $formInfo.find('#password1');
        let $password2 = $formInfo.find('#password2');
        let $mobile = $formInfo.find('#telphone');
        let $description = $formInfo.find('#description');
        let $gender = $formInfo.find('.sexVal');
        let valid = () => {
            // username
            let username = $username.val();
            if (/^\s*$/g.test(username)) {
                alert('请填写用户名~');
                return;
            }
            // password
            let password1 = $password1.val();
            let password2 = $password2.val();
            if (/^\s*$/g.test(password1)) {
                alert('请填写密码~');
                return;
            }
            if (password1 !== password2) {
                alert('两次密码输入不一致~');
                return;
            }
            //  mobile
            let mobile = $mobile.val();
            if (!/^1\d{10}$/g.test(mobile)) {
                alert('请填写正确格式手机号~');
                return;
            }
            // description
            let description = $description.val();
            if (/^\s*$/g.test(description) || description.length < 5 || description.length > 20) {
                alert('请填写不少于5个字并且不能超过20个字');
                return;
            }
            // sex
            let gender = $gender.filter(':checked').val();

            let params = {
                username,
                password: password1,
                mobile,
                description,
                gender
            };

            let {registerUrl} = REQ_API;
            $.ajax({
                url: registerUrl,
                type: 'POST',
                data: params,
                dataType: 'json',
                success(res) {
                    if (res.errno === 0) {
                        let {setStorage} = utilsObj;
                        params.id = res.id;
                        setStorage('voteUser', params);
                        alert(res.msg);
                        window.location.href = '/vote/index';
                    }
                }
            })
        };
        $submitBtn.on('click', valid);
    }
});