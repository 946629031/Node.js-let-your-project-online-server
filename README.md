
# 项目上线的整体思路

> 本文讲解的是，如何从0到项目上线的整个过程

1. 购买自己的域名
2. 购买自己的服务器空间
3. 域名备案
4. 配置服务器应用环境 ( 解析和绑定：把域名和空间联系起来 )
5. 安装配置数据库
6. 项目远程部署发布与更新 ( 上传安装程序： 部署服务器 )

----
## 1.域名
- 域名商介绍：
    - 国内：万网、阿里云
    - 国外：Godaddy
    - .AI域名: www.ai-domain.com

## 2.服务器
- 空间商推荐：
    - 国内空间商：万网（域名需备案）   无法直接使用，必须域名先备案，才能绑定空间
    - 购买阿里云虚拟主机，虚拟主机无需备案，只要域名备案即可
    - 香港空间商：主机庙（无需备案）	http://www.zhujimiao.com
    - 美国空间商：bluehost（无需备案）

> 教程地址：https://youtu.be/XTpxi2u3BpY

## 3.域名备案
- 备案：当申请人想要在国内使用域名，则需要向当地的 工信部（通信管理局）（省级）去申请报备。[域名备案视频教程](https://youtu.be/s1MwJk_9mqo)

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

## 4. 配置服务器应用环境
- ## 1. 远程登陆服务器
    - 1.登陆阿里云
    - 2.控制台 -> 云服务器 ECS -> 就能看到我们所购买过的 **云服务器列表** -> 点击运行中，即可进到服务器的信息页面 -> 找到IP地址
    - 3.远程登陆服务器工具：非mac用户，下载 [PuTTY](https://putty.org/) 登陆工具
    - 4.Linux系统 远程登陆服务器 方式：
        - 1.```ssh root@120.79.65.141``` 用户名@ip地址，第一次登陆会让你信任该 ip地址，直接 输入yes
        - 2.输入密码
        - 3.登陆成功
        - 4.```ctrl + d``` 退出登陆
    - 5.另外
        - 通过上面 第2步 的操作，在服务器的最后，有“更多”按钮，先“停止”，然后可以更换系统盘
        - 阿里服务器也是有分，系统盘 和 数据盘的
        - 数据盘是可以额外购买的，额外购买后，需要再将它挂载到你的服务器上
        - 如果没有额外购买数据盘，就不需要额外挂载
        - 阿里云会默认把 系统盘 和 应用 都跑在同一个硬盘上。但是，如果重装系统，所有的网站资料 和 用户数据 都会丢失
        - ```fdisk -l``` 可以查看 有多少个磁盘
        - ```df -h``` 查看硬盘使用情况