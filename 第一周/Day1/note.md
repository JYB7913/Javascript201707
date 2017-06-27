## git （分布式版本控制系统）

- 1 备份存储 托管代码


### 下载
1.windows系统
[git下载官网](https://git-scm.com/download/win)
- 右键选择git bash here 输入命令查看版本号
```
git --version
```

2.mac
- 1.下载HomeBrew(在终端输入以下命令进行安装)
```
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

```
- 2.HomeBrew安装git
```
brew install git
git --version
```


### github 注册 (https://github.com/)

### clone远程仓库下载到本地
```
git clone 仓库地址
```

## 查看本地仓库和哪些远程仓库建立了联系
```
 git remote -v
```
### 配置用户和邮箱(在电脑第一次使用git时候 配置 以后不需要)
```
git config --global user.email "102495553@qq.com"

 git config --global user.name "wenli"
```

##将本地仓库修改 上传到 远程仓库
1.将工作区修改添加到暂存区
```
git add ./-A(添加所有)
```
2.将暂存区提交到历史区
```
git commit -m "描述"
```
3.推送到远程仓库
```
git push origin master
```

### 拉取老师仓库
#### 方式一
1.将老师仓库 clone到自己本地
```
git clone 老师仓库地址
```

2. 以后每一次更新同步老师的仓库(不要在老师仓库做任何修改)
```
git pull origin master
```

#### 方式二
1. 将老师仓库fork 到自己的远程仓库
> 进入到老师的远程仓库 右上角 点击 fork 

2.将fork到自己github上的仓库 clone到本地

```
git clone 仓库地址

```

3.和老师的远程仓库建立联系
```
git remote add teacher 老师地址

git remote -v (查看当前本地仓库和哪些远程仓库建立了联系)

```

4. 更新同步 老师仓库修改到自己本地(以后每一次要执行的命令)
```
更新和老师的链接状态
git remote update teacher(老师仓库别名)
拉取老师仓库的更新
git pull teahcer master
```
5.将本地更新 在上传到自己的远程仓库
```
git add .

git commit -m "update"

git push origin master

```

### 将原有的项目目录 初始化为本地仓库
1.进入项目目录 打开命令窗口输入
```
git init // 初始化为本地仓库
```

2.在自己github上创建一个远程仓库 2017vuex
3. 在初始化的本地仓库里 建立远程联系
```
git remote add origin https://github.com/liwenli111/2017vuex.git

```
4. 上传（add commit pull push）

### 创建git忽略文件(将忽略的文件名/目录名写入)
```
.gitignore

```


