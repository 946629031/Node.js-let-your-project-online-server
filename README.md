## 工具整理
- ### [PuTTY](https://putty.org/)
    - #### 1.PuTTY 是什么？
        - window 远程登陆服务器工具
    - #### 2.putty中如何复制粘贴？
        - windows中复制：直接选中文本，按Ctrl+C。
        - putty中粘贴：鼠标右键
- ### [宝塔](https://www.bt.cn/)
    - 0.宝塔如何使用？
        - 添加FTP -> 添加网站 (使某个域名 指向 该服务器的 某个目录)
        - 需要数据库的话 也可以添加数据库
    - 1.什么是宝塔？
        - 简单好用的**服务器运维**面板
    - 2.[新手建站必备 -- 宝塔面板一键安装教程](https://zhuanlan.zhihu.com/p/52812212)
        - 新手建站最大的痛苦就是不好入门，代码太多，无法轻松管理。
        - **有了宝塔面板就不会有太多命令操作了**
    - 3.[宝塔面板如何上传网站源码？](https://www.west.cn/docs/64323.html)
        - FTP上传工具：FlashFXP
    - 4.[宝塔mysql怎么用navicat连接数据库呢？](https://blog.csdn.net/qq_35694313/article/details/80360362)
- ### 数据库 mysql
    - 常用语句
        - `mysql -u数据库用户名 -p密码` 命令行登陆数据库
        - `show database;`
        - 选择某个数据库
            ```
            mysql> use longyu
            Database changed
            ```
    - 【Navicat Premium 12】 - 最好用的数据库管理工具
- ### PM2
    - 参考文章
        - [pm2---node 进程管理工具](https://juejin.im/post/5d26ffeaf265da1b9163bf15)
        - [PM2实用入门指南](https://www.cnblogs.com/chyingp/p/pm2-documentation.html)
    - #### 1.什么是PM2？
        - P (rocess) M (anager)2
        - node 进程管理工具
        - 用于启动 node 服务，且 关闭了命令行也能运行
    - #### 2.常用命令
        - `pm2 start app.js`
        - `pm2 start app.js --watch`
        - `pm2 restart app.js`
        - `pm2 stop all`
        - `pm2 list`

----


[【慕课网】项目上线流程](https://www.imooc.com/learn/1004)
- 2-1 课程准备工作 (01:02)
- 2-2 服务器购买以及配置 (08:23)
- 2-3 连接到远程服务器 (02:37)
- 2-4 Web服务器的选择 (05:56)
- 2-5 配置Web服务器 (06:17)
- 2-6 上传网站到服务器 (06:26)
- 2-7 域名购买以及解析 (07:59)
- 2-8 结合HTTP协议理解课程 (02:49)


# 项目上线的整体思路

> 本文讲解的是，如何从0到项目上线的整个过程

## 第1章.生产环境所需要素
1. 购买自己的域名
2. 购买自己的服务器空间
3. 域名备案
4. 配置服务器应用环境 ( 解析和绑定：把域名和空间联系起来 )
5. 安装配置数据库
6. 项目远程部署发布与更新 ( 上传安装程序： 部署服务器 )

----
### 1-1.域名
- 域名商介绍：
    - 国内：万网、阿里云
    - 国外：Godaddy
    - .AI域名: www.ai-domain.com

### 1-2.服务器
- 空间商推荐：
    - 国内空间商：万网（域名需备案）   无法直接使用，必须域名先备案，才能绑定空间
    - 购买阿里云虚拟主机，虚拟主机无需备案，只要域名备案即可
    - 香港空间商：主机庙（无需备案）	http://www.zhujimiao.com
    - 美国空间商：bluehost（无需备案）

> 教程地址：https://youtu.be/XTpxi2u3BpY

### 1-3.域名备案
- 备案：当申请人想要在国内使用域名，则需要向当地的 工信部（通信管理局）（省级）去申请报备。[域名备案视频教程](https://youtu.be/s1MwJk_9mqo)
- 备案流程：
    - 阿里云右上角找到 **备案**
    - **备案服务号申请**
    - 在服务器的右侧点击 **申请**
    - 接下来根据网站提示备案即可

|建站时，必要的 **数据记录**|
| :----------- |
|域名：xxx.com|
|管理密码：***|
||
|FTP信息整理：|
|FTP账号：|
|FTP密码：|
|空间IP地址：|
||
|数据库信息整理：|
|数据库名称：|
|数据库用户名：|
|数据库密码：|


# node.JS 最后一公里   Node.js项目线上服务器部署与发布
- 第1章 课程预热
- 第2章 待部署的 5 个本地 Nodejs 项目
- 第3章 选购域名服务器及备案
- 第4章 远程登录服务器
    - [远程登陆](#4-1-远程登陆服务器)
    - [添加用户并赋予root权限](#4-2-添加用户并赋予root权限)
    - [SSH 无密码登陆服务器 公钥私钥登陆](#4-3-SSH-无密码登陆服务器-公钥私钥登陆)
- 第5章 增强服务器安全等级
- 第6章 搭建 Nodejs 生产环境
- 第7章 配置 Nginx 实现反向代理
    - 让web服务 通过 80端口 被访问
- 第8章 利用 DNSPod 管理域名解析
- 第9章 服务器配置安装 MongoDB
- 第10章 向服务器正式部署和发布上线 Nodejs 项目
- 第11章 使用和配置更安全的 HTTPS 协议

- # 第4章 远程登录服务器
    - ## 4-1 远程登陆服务器
        - 1.登陆阿里云
        - 2.控制台 -> 云服务器 ECS -> 就能看到我们所购买过的 **云服务器列表** -> 点击运行中，即可进到服务器的信息页面 -> 找到IP地址
        - 3.远程登陆服务器工具：非mac用户，下载 [PuTTY](https://putty.org/) 登陆工具
        - 4.Linux系统 远程登陆服务器 方式：
            - 1.```ssh root@120.79.65.141``` 用户名@ip地址，第一次登陆会让你信任该 ip地址，直接 输入yes
            - 2.输入密码
            - 3.登陆成功
            - 4.```ctrl + d``` 退出登陆
        - 5.另外
            - 通过上面 第2步 的操作，在服务器的最后，有“更多”按钮，先“停止”，然后可以更换系统盘
            - 阿里服务器也是有分，系统盘 和 数据盘的
            - 数据盘是可以额外购买的，额外购买后，需要再将它挂载到你的服务器上
            - 如果没有额外购买数据盘，就不需要额外挂载
            - 阿里云会默认把 系统盘 和 应用 都跑在同一个硬盘上。但是，如果重装系统，所有的网站资料 和 用户数据 都会丢失
            - ```fdisk -l``` 可以查看 有多少个磁盘
            - ```df -h``` 查看硬盘使用情况
    - ## 4-2 添加用户并赋予root权限
        - 添加用户
            - `adduser username`
            - 输入新用户密码
                - 把这些 用户名 和 密码记录下来，因为很有可能会忘记
        - 授权
            - `gpasswd -a username sudo` 让这个用户 以sudo 的角色来调用命令，让他能够调用超级权限 但是必须输入密码
        - `sudo visudo`
            - `tommy   ALL=(ALL)     ALL`
            - 修改完毕，现在可以用tommy帐号登录，然后用命令 sudo – ，即可获得root权限进行操作。
    - ## 4-3 SSH 无密码登陆服务器 公钥私钥登陆
        ```
        ···············           ·····················
        ·   本地私钥   ·    ----》  · 本地传到服务器的公钥 ·
        ···············           ·····················
                                            |
                     本地生成私钥和公钥        |
                                            ↓
        ···············           ·····················
        ·   登陆成功   ·   《----   ·    密钥算法比对     ·
        ···············           ·····················
        ```

- # 第7章 配置 Nginx 实现反向代理
    - 1.如何配置
        - 让web服务 通过 80端口 被访问
        - 安装 Nginx `sudo apt-get install nginx`
        - `nginx -v`
        - `cd /etc/nginx`
        - `cd conf.d`
        - `sudo vi imooc-com-8081.conf` 新建配置文件，配置文件对应 imooc.com:8081 网址
            ```
            upstream imooc {    # imooc 是应用的名字
                server 127.0.0.1:8081
            }

            server {
                listen 80;
                server_name 111.229.237.104; # 这里写服务器的 ip地址

                location / {
                    proxy_set_header X-Real-IP $remote_addr;
                    proxy_set_header X-Forward-For $proxy_add_x_forwarded_for;
                    proxy_set_header Host $http_host;
                    proxy_set_header X-Nginx-Proxy true;

                    proxy_pass http://imooc;
                    proxy_redirect off;
                }
            }
            ```
            - ### 常用参数说明
                - upstream模块中：
                    - server：负载均衡后端服务器的IP或域名，不写端口的话默认是80。高并发场景用域名，再通过DNS进行负载均衡 
                - proxy_pass
                    - nginx反向代理主要通过proxy_pass来配置，将你项目的开发机地址填写到proxy_pass后面，正常的格式为proxy_pass URL即可
        - `nginx.conf` 是 Nginx 配置文件
            - 取消注释
                ```
                include /etc/nginx/conf.d/*.conf;
                include /etc/nginx/siles-enabled/*;
                ```
                - 意思是 将这两个目录下到文件 都加载进来
        - `sudo nginx -t` 测试配置文件 有没有错误
        - `sudo nginx -s reload` 重启nginx
    - 2.验证
        - 在浏览器访问 `111.229.237.104`，如果能够正常访问
        - 则证明
            - 我们配置的 Nginx 已经生效
            - 我们跑在 8081 端口上的 node服务，已经被转发到 80端口 上了
            - 也就是 实现了 **`端口的内部转发`**
    - 3.在浏览器里 可以查看 Nginx 版本信息
        - 浏览器 - 控制台 - Network - 请求头里 可以看到
        - `Server: nginx/1.4.6 (Ubuntu)`