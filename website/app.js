const http = require('http');
const homePage = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset='utf-8'>
    <title>Nodejs 部署上线示例（随时失效）</title>

    <style type="text/css">
        * { padding: 0; margin: 0; }
        body { padding: 30px 0; text-align: center; font-size: 16px; background-color: #333; }
        h1, h2 { color: #fff; }
        nav { margin-top: 20px; }
        a { color: #ccc; text-decoration: none; }
        a:hover { text-decoration: underline; }
    </style>

  </head>
  <body>
    <h1>慕课网 Nodejs 高级课程案例</h1>
    <h2>项目部署上线示例</h2>
    <nav>
      <ul>
        <li>
          <a target="_blank" href="/a">Nodejs 电影网站</a>
        </li>
        <li>
          <a target="_blank" href="/b">狗狗说 App 后台</a>
        </li>
        <li>
          <a target="_blank" href="/c">微信小程序后台</a>
        </li>
        <li>
          <a target="_blank" href="/d">微信公众号后台</a>
        </li>
      </ul>
    </nav>
  </body>
</html>
`

http.createServer((req, res) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/html')
    res.end(homePage)
})
.listen(3000, () => {
    console.log('Server Running At 3000');
})