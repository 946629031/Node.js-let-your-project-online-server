# node.JS 最后一公里   Node.js项目线上服务器部署与发布
- #### 目录
    - [0.工具整理](#0工具整理)
    - 第1章 课程预热
    - 第2章 待部署的 5 个本地 Nodejs 项目
    - 第3章 选购域名服务器及备案
    - 第4章 远程登录服务器
        - [远程登陆](#4-1-远程登陆服务器)
        - [添加用户并赋予root权限](#4-2-添加用户并赋予root权限)
        - [SSH 无密码登陆服务器 公钥私钥登陆](#4-3-SSH-无密码登陆服务器-公钥私钥登陆)
    - 第5章 增强服务器安全等级
    - 第6章 搭建 Nodejs 生产环境
    - [第7章 配置 Nginx 实现反向代理](#第7章-配置-Nginx-实现反向代理)
        - 让web服务 通过 80端口 被访问
        - [1.端口冲突问题](#1端口冲突问题)
        - [2.实现不同的域名映射到不同端口下的应用](#2实现不同的域名映射到不同端口下的应用)
        - [3.https 证书安装](#3https-证书安装)
        - [4.非80端口，其他端口，也HTTPS. nginx 非80端口http 转https](#4非80端口其他端口也https-nginx-非80端口http-转https)
    - 第8章 利用 DNSPod 管理域名解析
    - 第9章 服务器配置安装 MongoDB
    - 第10章 向服务器正式部署和发布上线 Nodejs 项目
    - 第11章 使用和配置更安全的 HTTPS 协议

----

- # 0.工具整理
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
        - `pm2 logs` 查看日志文件 (如果服务自动重启次数过多，可以查看服务日志)
- ### 查询端口占用
    ```
    netstat -an|grep 8080
    lsof -i:8080
    ```
    - 关闭占用端口的进程 
    ```
    kill <pid>
    ```

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


----

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
    - [Nginx教程 尚硅谷 (nginx快速上手)](https://www.bilibili.com/video/BV1zJ411w7SV)
    - ## 基础概念
        - ### Nginx 三个主要概念
            ```
            - 反向代理 和 正向代理

            - 负载均衡

            - 动静分离
            ```
            - #### 正向代理
                - Nginx不仅可以做反向代理，实现负载均衡。还能用作正向代理来进行上网等功能。正向代理：如果把局域网外的 Internet 想象成一个巨大的资源库， 则局域网中的客户端要访问 Internet，则需要通过代理服务器来访问，这种代理服务就称为正向代理。
                - **`浏览器要配置 代理服务器`**，通过代理服务器进行互联网访问
                ![](./img/1.jpg)
            - #### 反向代理
                - 反向代理，其实客户端对代理是无感知的，因为客户端 **`不需要任何配置`** 就可以访问。
                - 我们只需要将请求发送到反向代理服务器，由反向代理服务器去选择目标服务器获取数据后，在返回给客户端。
                - 此时 `反向代理服务器` 和 `目标服务器` 对外就是一个服务器，暴露的是代理服务器地址，隐藏了真实服务器IP地址。
                ![](./img/2.jpg)
            - 区别
                - 正向代理 是 `客户+代理=客户`，反向代理 是 `代理+服务器=服务器`
                - 正向代理隐藏真实的客户端，反向代理隐藏真实的服务端
                - 正向代理是内网访问外网代理，反向代理是外网访问内网
                - 正向代理在客户端配置，反向在服务端

        - ### Nginx 常用命令
            ```shell
            nginx -v
            nginx -t         # 测试配置文件 有没有错误
            nginx -s reload  # 重载配置文件 / 重启
            nginx -s stop    # 关闭

            # linux/mac启动
            $ service nginx start

            # windows启动
            > start nginx

            # 查看端口
            $ netstat -an | grep 端口  # linux/mac系统
            > netstat -an | findstr 端口  # windows系统

            # 手动指定配置
            $ nginx -c /usr/local/nginx/conf/nginx.conf

            # -p指定nginx运行目录(日志存储位置)
            $ nginx -c /path/nginx.conf -p /path/

            # 测试web服务
            $ curl -i 主机:端口
            # 或
            $ telnet 主机 端口

            # 查看进程
            $ ps -ef | grep nginx
            $ kill -9 进程id      # 关掉进程

            # 查看错误日志
            $ tail -30 /var/log/nginx/error.log
            # 先查看 nginx.conf 配置文件里 http 模块下 error_log 的指定位置 error_log /var/log/nginx/error.log
            ```
        - ### Nginx 配置文件
            - 配置文件位置 `nginx/conf/nginx.conf`
            - 配置文件 由三部分组成
                - 1.**`全局块`**
                - 2.**`events 块`**
                - 3.**`http 块`**
            - #### 1.**`全局块`**
                - 位置：从配置文件开始到events块之间的内容
                - 主要会设置一些影响 nginx服务器整体运行的配置指令，主要包括配置运行Nginx服务器的用户(组)、允许生成的 worker process数，进程PID存放路径、日志存放路径和类型以及配置文件的引入等。。
                ```conf
                user www-data;
                worker_processes auto;
                pid /run/nginx.pid;
                include /etc/nginx/modules-enabled/*.conf;

                events {
                    worker_connections 1024;
                    # multi_accept on;
                }
                ```
                - `worker_processes`
                    - 这是 Nginx 服务器并发处理服务的关键配置， worker_processes 值越大，可以支持的开发处理量也越多，但是会受到硬件、软件等设备的制约。

            - #### 2.**`events 块`**
                - events 块，涉及的指令主要影响 Nginx 服务器与用户的网络连接
                - 常用的设置包括是否开启对多 work process 下的网络连接进行序列化，是否允许同时接收多个网络连接，选取哪种事件驱动模型来处理连接请求，每个 word process 可以同时支持的最大连接数等。
                    - 上述例子就表示每个 `work process` 支持的最大连接数为 1024
                    - 这部分的配置对Nginx的性能影响较大，在实际中应该灵活配置。
            - #### 3.**`http 块`**
                - 这算是Nginx服务器配置中最频繁的部分，代理、缓存和日志定义等绝大多数功能和第三方模块的配 都在这里
                - 需要注意的是: `http块` 包含 `http全局块`、`server 块`
                    - **`http 全局块`**
                        - 位置：从 `http 块` 开始到 `server 块` 之间的内容
                        - http全局块 配置的指令包括 文件引入、MIME-TYPE 定义、日志自定义、连接超时时间、单链接请求数上限等。

                    - **`server 块`**
                        - 这块和虚拟主机有密切关系，虚拟主机从用户角度看，和一台独立的硬件主机是完全一样的，该技术的产生是为了节省互联网服务器硬件成本。
                            - 每个 `http 块` 可以包括多个 `server 块`
                            - 而每个 `server 块` 就相当于一个虚拟主机
                        - 而每个server块也分为全局server 块，以及可以同时包含多个locaton 块。
                            - 1.`全局server 块`
                                - 最常见的配置是 本虚拟机主机 的监听配置和 本虚拟主机的名称 或 IP配置。
                            - 2.`location 块`
                                - 一个 `server` 块可以配置多个 `location 块`
                                - 这块的主要作用是基于 `Nginx 服务器` 接收到的 请求字符串 ( 例如server_name/uri-string ) , 对虚拟主机名称 ( 也可以是IP别名 ) 之外的字符串 ( 例如前面的 /uristring ) 进行匹配，对特定的请求进行处理。
                                - 地址定向、数据缓存 和 应答控制 等功能，还有许多第三方模块的配置也在这里进行。


            ```conf
            user www-data;
            worker_processes auto;
            pid /run/nginx.pid;
            include /etc/nginx/modules-enabled/*.conf;

            events {
                worker_connections 768;
                # multi_accept on;
            }

            http {

                ##
                # Basic Settings
                ##

                sendfile on;
                tcp_nopush on;
                tcp_nodelay on;
                keepalive_timeout 65;
                types_hash_max_size 2048;
                # server_tokens off;

                # server_names_hash_bucket_size 64;
                # server_name_in_redirect off;

                include /etc/nginx/mime.types;
                default_type application/octet-stream;

                ##
                # SSL Settings
                ##

                ssl_protocols TLSv1 TLSv1.1 TLSv1.2; # Dropping SSLv3, ref: POODLE
                ssl_prefer_server_ciphers on;

                ##
                # Logging Settings
                ##

                access_log /var/log/nginx/access.log;
                error_log /var/log/nginx/error.log;

                ##
                # Gzip Settings
                ##

                gzip on;

                # gzip_vary on;
                # gzip_proxied any;
                # gzip_comp_level 6;
                # gzip_buffers 16 8k;
                # gzip_http_version 1.1;
                # gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

                ##
                # Virtual Host Configs
                ##

                include /etc/nginx/conf.d/*.conf;
                include /etc/nginx/sites-enabled/*;

                server {
                    listen       80;
                    server_name  abc.com;
                    root         /home/userftp/;

                    location / {
                        proxy_redirect off;
                        proxy_set_header Host $host;
                        proxy_set_header X-Real-IP $remote_addr;
                        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                        proxy_pass http://127.0.0.1:8888;
                    }
                }
                # 监听80端口，只要是访问 abc.com 的，就转发到 8888 端口
            }
            ```

    ## 1.实操配置示例
    - ### 示例1：Nginx配置实例 - 反向代理
        - 1、实现效果
            - (1) 打开浏览器，在浏览器地址栏输入地址www.123.com, 跳转liunx系统tomcat主页面中
        - 2、准备工作
            - (1) 在liunx系统安装tomcat, 使用默认端口 8080
                - tomcat安装文件放到liunx系统中，解压
                - 进入 tomcat 的 bin 目录中，./startup.sh 启动 tomcat服务器
            - (2) 对外开放访问的端口
                - 开放端口 firewall-cmd --add-port=8080/tcp --permanent
                - 重启防火墙 firewall-cmd -reload
                - 查看已经开放的端口号 firewall-cmd --list-all
        ```
        - 示意图


              window browser                    Nginx                   tomcat / node server
        ┌───────────────────────┐      ┌───────────────────────┐      ┌───────────────────────┐
        |                       |      |                       |      |                       |
        |                       |      |                       |      |                       |
        |      www.123.com      |─────>|   192.168.17.129:80   |─────>|    127.0.0.1:8080     |
        |                       |      |                       |      |                       |
        |                       |      |                       |      |                       |
        └───────────────────────┘      └───────────────────────┘      └───────────────────────┘
        ```
        - 3、修改host
            - 使得 www.123.com 指向 192.168.17.129
        - 4.在 nginx 进行请求转发的配置（反向代理配置）
            ```conf
            # nginx.conf

            server {
                listen       80;
                server_name  192.168.17.129;
                root         /home/userftp/;

                location / {
                    proxy_pass http://127.0.0.1:8080;
                }
            }
            ```
        - 5、重启 nginx 服务器，浏览器访问 `www.123.com` ，看能不能访问到 `127.0.0.1:8080` 的东西
    - ### 示例2：Nginx配置实例 - 反向代理实例2
        - 1、实现效果
            - 使用 nginx 反向代理，根据访问的路径跳转到不同端口的服务中 nginx 监听端口为 9001
                - 访问 `http://127.0.0.1:9001/edu/` 直接跳转到 `127.0.0.1:8080`
                - 访问 `http://127.0.0.1:9001/vod/` 直接跳转到 `127.0.0.1:8081`
        - 2、准备工作
            - 分别在 8080 和 8081 两个端口 都启动一个服务器监听该端口
            - 准备测试页面，并放在对于服务器下
                ```html
                <h1>8080 !!!<h1>
                ```
                ```html
                <h1>8081 !!!<h1>
                ```
            - 防火墙、安全组 开放端口 9001, 8080, 8081

            ```conf
            # nginx.conf

            server {
                listen       9001;
                server_name  localhost;

                location ~ /edu/ {
                    proxy_pass http://127.0.0.1:8080;
                }

                location ~ /vod/ {
                    proxy_pass http://127.0.0.1:8081;
                }
            }
            ```
            `~` 表示后面是一个正则表达式


    - 1.如何配置
        - 让web服务 通过 80端口 被访问
        - 安装 Nginx `sudo apt-get install nginx`
        - `nginx -v`
        - `cd /etc/nginx`
        - `cd conf.d`
        - `sudo vi imooc-com-8081.conf` 新建配置文件，配置文件对应 imooc.com:8081 网址
            ```conf
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
                ```conf
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
    ## 2.自我实践总结
    - ### 1.端口冲突问题
        - 情况描述：
            - 当你的 nginx 在监听 3000端口 时
            - 你这时候又把应用跑在3000端口，`app.listen(3000)`
            - 这时候 你就会发现 出现报错
        - 原因分析：
            - 在同一台电脑，同一个端口，同一时间内， 只能被一个程序监听
            - 不能既被nginx监听，又被应用监听 `app.listen(3305`
            - 否则就会出现端口冲突
    - ### 2.实现不同的域名映射到不同端口下的应用
        - [原文连接](https://blog.csdn.net/y523006369/article/details/103696122)
        ```conf
        # nginx.conf

        server {
            listen 80;
            server_name  domain1.com;
            if ( $host !~* "domain1.com" ) {
                return 404;
            }
            location / {
                proxy_pass http://xxx.xxx.xxx.xxx:8080;
                proxy_set_header X-Real-IP $remote_addr;
            }
        }

        server {
            listen 80;
            server_name  domain2.com;
            if ( $host !~* "domain2.com" ) {
                return 404;
            }
            location / {
                proxy_pass http://xxx.xxx.xxx.xxx:8090;
                proxy_set_header X-Real-IP $remote_addr;
            }
        }
        ```
    - ### 3.https 证书安装
        - [Nginx 服务器ssl证书安装](https://cloud.tencent.com/document/product/400/35244)
        ```conf
        server {
            #SSL 访问端口号为 443
            listen 443 ssl; 

            #填写绑定证书的域名
            server_name www.domain.com; 

            # SSH start

            #证书文件名称
            ssl_certificate 1_www.domain.com_bundle.crt; 

            #私钥文件名称
            ssl_certificate_key 2_www.domain.com.key; 

            ssl_session_timeout 5m;

            #请按照以下协议配置
            ssl_protocols TLSv1 TLSv1.1 TLSv1.2; 

            #请按照以下套件配置，配置加密套件，写法遵循 openssl 标准。
            ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE; 
            ssl_prefer_server_ciphers on;
            
            # SSH end
        }
        ```
    - ### 4.非80端口，其他端口，也HTTPS. nginx 非80端口http 转https
        ```conf
        server {
                listen      3302;
                server_name  data.yiyulongyu.com 111.229.237.104;
                ssl on;
                ssl_certificate /www/server/nginx/ssl/1_data.yiyulongyu.com_bundle.crt;
                ssl_certificate_key /www/server/nginx/ssl/2_data.yiyulongyu.com.key;
                ssl_session_timeout  60m;
                ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
                # ssl_ciphers  HIGH:!aNULL:!MD5;
                ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE;
                ssl_prefer_server_ciphers   on;
                error_page 497 301 https://$http_host$request_uri;

                location / {
                    proxy_pass http://127.0.0.1:3305;
                }
        }
        ```
        - 重点是，错误时返回301转成https
            ```
            error_page 497 301 https://$http_host$request_uri;
            ```
        - [参考连接1](https://blog.csdn.net/lalaaboy/article/details/80895700)
        - [参考连接2](https://serverfault.com/questions/47876/handling-http-and-https-requests-using-a-single-port-with-nginx)
        
----
# Nginx 系统学习
- [nginx 文档](https://www.nginx.cn/doc/)
- [Nginx 中文官方文档](http://shouce.jb51.net/nginx-doc/)
- [nginx-超全视频2018 - 总时长18小时](https://www.bilibili.com/video/BV1j4411K7g2?p=54)
- ### 1.Location
    - 参考文章： [nginx 的 location 配置详解](https://blog.csdn.net/tjcyjd/article/details/50897959)
    ```conf
    语法规则： 

    location [ = | ~ | ~* | ^~ ] /uri/ {
         … 
    }
    ```
    |||
    |----|----|
    |`/`|通用匹配，任何请求都会匹配到|
    |`=`|精确匹配，不支持正则表达式|
    |`~`|区分大小写的正则匹配|
    |`~*`|不区分大小写的正则匹配|
    |`^~`|uri 以某个常规字符串开头，理解为匹配 url 路径即可。<br> nginx 不对 url 做编码，因此请求为 `/static/20%/aa`，可以被规则 `^~ /static/ /aa` 匹配到（注意是空格）。|
    |`!~`<br>`!~*`|区分大小写 不匹配 的正则<br> 不区分大小写 不匹配 的正则|
    |||
    - 多个location配置的情况下匹配顺序为（参考资料而来，还未实际验证，试试就知道了，不必拘泥，仅供参考）：
        - 首先匹配 `=`，其次匹配 `^~`，其次是按文件中顺序的 正则匹配，最后是交给 `/` 通用匹配。
        - `location =` > `location 完整路径` > `location ^~ 路径` > `location ~* 正则` > `location 路径`
        - 当有匹配成功时候，停止匹配，按当前匹配规则处理请求。
    ```conf
    location = / { ... }            #规则A

    location = /login { ... }       #规则B

    location ^~ /static/ { ... }    #规则C

    location ~ \.(gif|jpg|png|js|css)$ { ... }   #规则D

    location ~* \.png$ { ... }      #规则E

    location !~ \.xhtml$ { ... }    #规则F

    location !~* \.xhtml$ { ... }   #规则G

    location / { ... }              #规则H
    ```
    - 那么产生的效果如下：
        - 访问根目录 `/`， 比如 `http://localhost/` 将匹配 规则A
        - 访问 `http://localhost/login` 将匹配规则B，`http://localhost/register` 则匹配 规则H
        - 访问 `http://localhost/static/a.html` 将匹配 规则C
        - 访问 `http://localhost/a.gif`，`http://localhost/b.jpg` 将匹配 `规则D` 和 `规则E`，但是 `规则D` 顺序优先，`规则E` 不起作用，而 `http://localhost/static/c.png` 则优先匹配到 `规则C`
        - 访问 `http://localhost/a.PNG` 则匹配 `规则E`， 而不会匹配 `规则D`，因为 `规则E` 不区分大小写。
        - 访问 `http://localhost/a.xhtml` 不会匹配规则F和规则G，`http://localhost/a.XHTML` 不会匹配 `规则G`，因为不区分大小写。`规则F`，`规则G` 属于排除法，符合匹配规则但是不会匹配到，所以想想看实际应用中哪里会用到。
        - 访问 `http://localhost/category/id/1111` 则最终匹配到 `规则H`，因为以上规则都不匹配，这个时候应该是nginx转发请求给后端应用服务器，比如 FastCGI（php），tomcat（jsp），nginx 作为 方向代理服务器 存在。

    - 所以实际使用中，通常至少有三个匹配规则定义，如下：
        ```conf
        # 直接匹配网站根，通过域名访问网站首页比较频繁，使用这个会加速处理，官网如是说。
        # 这里是直接转发给后端应用服务器了，也可以是一个静态首页
        # 第一个必选规则
        location = / {
            proxy_pass http://tomcat:8080/index
        }
        
        #  第二个必选规则是处理静态文件请求，这是nginx作为http服务器的强项
        #  有两种配置模式，目录匹配或后缀匹配,任选其一或搭配使用
        location ^~ /static/ {
            root /webroot/static/;
        }
        location ~* \.(gif|jpg|jpeg|png|css|js|ico)$ {
            root /webroot/res/;
        }
        
        # 第三个规则就是通用规则，用来转发动态请求到后端应用服务器
        # 非静态文件请求就默认是动态请求，自己根据实际把握
        # 毕竟目前的一些框架的流行，带.php,.jsp后缀的情况很少了
        location / {
            proxy_pass http://tomcat:8080/
        }
        ```
- ### 2.Rewrite 基本概述
    > 参考文章：[rewrite 语法 部分 - nginx的location配置详解](https://blog.csdn.net/tjcyjd/article/details/50897959)
    - rewrite 主要实现 url 地址重写，以及重定向.
    - Rewrite使用场景
        - 1.URL访问跳转：支持开发设计，页面跳转，兼容性支持，展示效果
        - 2.SEO优化：依赖于url路径，以便支持搜索引擎录入
        - 3.维护：后台维护，流量转发等
        - 4.安全：伪静态，真实动态页面进行伪装
    - [rewrite - 【nginx 文档】](https://www.nginx.cn/doc/standard/httprewrite.html)
    #### Rewrite 配置语法
    ```
    语法: rewrite regex replacement [flag]

    默认: none

    作用域: server, location, if
    ```
    - 示例
        ```js
        //所有请求转发至/pages/maintain.htmL
        rewrite ^(.*)$ /pages/maintain.html break;

        // \ 转义字符
        rewrite index\.php$ /pages/maintain.html break ;

        // ()用于匹配括号之间的内容，通过$1, $2调用
        if ($http_user_agent ~ Chrome){
            rewrite ^(.*)$ /chrome/$1 break ;
        }

        rewrite ^(.*)$ /chrome/$1
        // 当我访问     http://LocaLhost/test.xxx.html
        // 最终会变成   http://LocaLhost/chrome/test.xxx.html

        ```
    - #### flag
        |flag||
        |----|----|
        |last| 停止rewrite检测。完成重写指令的处理，然后搜索相应的URI和位置|
        |break| 停止rewrite检测。完成重写指令的处理|
        |redirect|使用代码302返回临时重定向; 如果替换行以 `http://`|
        |permanent|使用代码301返回永久重定向|
        - 1.对比 `last` 与 `break`:
            ```
            location ~ ^/break {
                rewrite ^/break /test/ break;
            }

            location ~ ^/last{
                rewrite ^/last /test/ last;
            }

            location /test{
                default_ type application/json;
                return 200 '{"status" :"success"}';   # 返回html字符串 '{"status" :"success"}'
            }
            ```
            - last 与 break对比总结:
                ```
                http://192.168.69.112/last
                    -> http://192.168.69.112/test

                http://192.168.69.112/break  停止匹配
                    -> http://192.168.69.112/test

                ```
                - `last` 会新建立一个请求，请求域名+/test
                - `break` 匹配后不会进行匹配，会查找对应root站点目录下包含/test目录
        - 2.对比 flag 中 `redirect` 与 `permanent`
            ```
            server {
                listen 80;
                server_name localhost;
                root /soft/code;

                location ~ ^/bgx {
                      rewrite ^/bgx http://kt.xuliangwei.com redirect ;
                    # rewrite ^/bgx http://kt.xuliangwei.com permanent ;
                }
            ```
            - redirect
                - 当我访问 `192.168.69.112/bgx` 时，它会跳转到 `http://kt.xuliangwei.com`
            - permanent
                - 当你跳过一次之后，浏览器缓存 就记住了，下次直接跳到 目标地址。除非你用无痕浏览器访问，才会重新跑一遍这个命令，然后在跳转
    - #### Rewirte 应用场景
        - 1.隐藏真实地址
            - 隐藏目录结构，仅向外暴露假地址，然后经过 nginx 过滤后，跳转到指定真实地址
            ```
            假地址  http://192.168.69.112/course-11-22-course_33.html
            真地址  http://192.168.69.112/course/11/22/course_33.html

            location / {
                rewrite ^/course-(\d+)-(\d+)-course_(\d+)\.html /course/$1/$2course_$3.html break;
            }
            ```

        - 2.过滤掉某些用户
            - 只要你是 Chrome 浏览器过来的，并且是从 `/nginx` 访问过来的，我都一律给他跳转到 指定地址
            ```
            if ($http_user_agent ~* Chrome){
                rewrite ^/nginx http://kt.xuliangwei.com/index.html redirect;
            }
            ```

- # 第10章 向服务器正式部署和发布上线 Nodejs 项目
    > <br>
    > 本节讲解什么内容？<br>
    > 本地控制远端代码更新<br>
    > <br>

    - ## 10-1 在服务器上安装git
        - 在服务器上安装git，并配置公钥，让其能够拉取你本地开发好的代码
        - 而不用 每次本地开发完代码，都要一点一点从本地上传
        - 让服务器的Server 代码也拥有 版本控制的能力
    - ## 10-2 通过pm2让服务跑起来
        - 上一节，我们把本地的代码 都推送到了 私有github仓库。并且，服务器也能通过 git下载到 私有仓库的代码
        
            > <br>
            > 思路：<br>
            > 1.通过本地pm2工具，在本地命令行上，登录服务器，<br>
            > 2.通知服务器从我们的git仓库里 把代码clone到我们的服务器里，并部署到相应的文件夹中，<br>
            > 3.然后等待我们的操作：如 `npm install`, `pm2 start`<br>
            > <br>

        - ### pm2
            - 那么这个时候，我们就需要有一个 **傻瓜式的、管理代码更新、和服务运行的工具**，帮助我们 **同步代码更新、重启服务** 的工作。那么这个工具，就是我们接下来要讲的 pm2
                - 他的同类产品还有
                    - supervisor
                    - forever
                    - pm2
                    - ...
        - ### pm2 能干嘛？
            - 守护node服务
            - 平滑重启
            - 代码自动更新
            - 从本地到线上的部署
                - 官网文档地址：[pm2.keymetrics.io](https://pm2.keymetrics.io)
                    - 打开 documentation, 翻到 [deployment](https://pm2.keymetrics.io/docs/usage/deployment/)
        - ## 通过pm2拉取git仓库代码 到服务器上
            - 参考文章：[通过Github与PM2部署Node应用 - 【知乎专栏】](https://zhuanlan.zhihu.com/p/20940096)
            - #### 1.本地安装pm2
                - `npm install pm2 -g`
                ```
                pm2 -v
                4.2.3
                ``` 
                 - 如果可得到版本号，则说明安装成功

            - #### 2.在本地电脑，新建文件 `ecosystem.json`
                - 在这里里面，我们来配置 仓库的地址、服务器ip、账号...
                ```js
                // ecosystem.json

                {
                    "apps" : [{
                        "name" : "HTTP-API",        // 给应用起名字
                        "script" : "index.js",      // 启动服务的脚本 node index.js
                        "env": {
                            "COMMON_VARIABLE": "true"
                        },
                        "env_production" : {        // 设置生产环境的变量 为 production
                            "NODE_ENV": "production"
                        }
                    }],
                    "deploy" : {    // 部署任务
                        // "production" is the environment name
                        "production" : {
                            "user" : "imooc_manager",   // 服务器上的user
                            "host" : ["192.168.0.13"],  // 如果有多个服务器 可以传多个ip
                            "port" : "39999",           // user登陆的端口号, 如果不需要就删掉
                            "ref"  : "origin/master",   // git 的分支
                            "repo" : "git@github.com:Username/repository.git",  // github仓库地址
                            "path" : "/www/wwwroot/threeki/dedao/Server/",  // 我们要把代码部署到服务器的哪个目录下
                            "ssh_options": "StrictHostKeyChecking=no",  // 吧key校验取消掉
                            "post-deploy" : "npm install && pm2 startOrRestart ecosystem.json --env production",         // git仓库代码clone后 会执行的命令
                            "env"  : {
                                "NODE_ENV": "production"
                            },
                        },
                    }
                }
                ```
            - #### 3.本地电脑 执行命令```pm2 deploy ecosystem.json production setup```
                - 命令格式 ```pm2 deploy <configuration_file> <environment> setup```
                - This command will create the folders on your remote server.
                    - 如果遇到权限问题
                        - `sudo chmod 777 <folders_name>`
                    - 创建好文件夹后，得到下面几个文件夹
                        ```
                        - production
                            - current       // 当前服务所运行的文件夹
                            - shared        // 日志文件 pid之类的 共享的数据之类的
                            - source        // clone下来的源代码
                        ```
            - #### 4.可能遇到的问题
                - ##### 问题1：
                    - 执行命令 `pm2 deploy ecosystem.json production setup` 后遇到下面问题
                        ```
                        [root@VM_0_8_centos Server]# pm2 deploy ecosystem.json production setup
                        --> Deploying to production environment
                        --> on host 111.229.237.101
                        ○ hook pre-setup
                        ```
                    - 解决问题
                        - [看了官网文档后](https://pm2.keymetrics.io/docs/usage/deployment/#troubleshooting)
                            - 先尝试clone 仓库代码 `git clone git@github.com:946629031/Init_Node_Server.git`
                                - 后发现克隆不了
                            - 找到原因
                                - 你在执行命令前，先确保 服务器上 有github 的公钥
                                    - 1.如何生成公钥？
                                        - `ssh-keygen -t rsa -C "946629031@qq.com"`
                                    - 2.查看公钥 `cat /root/.ssh/id_rsa.pub`
                                        - `cat` 命令是一次显示整个文件
                                    - 3.复制公钥 到github SSH key 中
                            - 再次执行 `git clone git@github.com:946629031/Init_Node_Server.git` 
                            - 就能成功克隆代码了
                - ##### 问题2：
                    - 注意：如果项目带有vue 或者webpack 这种，需要本地构建的代码，可以在"post-deploy"中添加构建命令
                        - 如： 
                            - `npm run build` vue本地构建
                            - `webpack input.js output.js` webpack本地构建
                            - `grunt build` grunt本地构建
                        ```
                        "post-deploy" : "npm install && npm run build && pm2 startOrRestart ecosystem.json --env production"
                        ```
                - ##### 问题3：
                    - 注意：如果部署失败
                        - [How to fix git pull failed on a deploy via PM2](https://davidburgos.blog/fix-git-pull-failed-deploy-pm2/)
                        - 出现以下错误 提示
                        ```
                        Please, commit your changes or stash them before you can merge.
                        Aborting

                        git pull failed

                        Deploy failed
                        ```
                        - 解决办法
                        ```
                        deploy: {
                            production: {
                            ...
                            "pre-deploy": "git reset --hard",   // 这将删除服务器上的更改，然后将获取存储库并进行部署而不会出现问题
                            ...
                            }
                        }
                        ```

            - #### 5.安装成功
                ```
                $ pm2 deploy ecosystem.json production setup
                --> Deploying to production environment
                --> on host 111.229.237.101
                ○ hook pre-setup
                ○ running setup
                ○ cloning git@github.com:946629031/Init_Node_Server.git
                ○ full fetch
                Cloning into '/www/wwwroot/threeki/dedao/Server//source'...
                ○ hook post-setup
                ○ setup complete
                --> Success
                ```
            - 这时候再到 服务器上查看
                ```
                $ cd /www/wwwroot/threeki/dedao/Server

                $ ls
                current  shared  source
                ```
                显示 `current  shared  source` 即表示pm2部署成功


    - ## 10-3 如何把本地修改同步到线上服务器？
        - 1.修改本地代码
        - 2.提交代码
            ```
            git add .
            git commit -m ''
            git push
            ```
        - 3.`pm2 deploy ecosystem.json production`


