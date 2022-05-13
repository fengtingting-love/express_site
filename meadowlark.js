var express = require('express')
var app = express()

// 设置handlebars视图引擎
var handlebars = require('express3-handlebars')
    // 指定默认布局为main.handlebars页面布局结构
    .create({ 'defaultLayout': 'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3333)

var fortunes = require('./lib/fortune.js')

// 静态资源目录，应该放在所有路由之前，内部所有文件对外开放
app.use(express.static(__dirname + '/public'));

// get 方法配置路由
app.get('/', function(req, res) {
    // res.type('text/plain')
    // res.send('Home Page')
    res.render('home')
})

app.get('/about', function(req, res) {
    // res.type('text/plain')
    // res.send('About Page')
    res.render('about', {fortune: fortunes.getFortune()})
})

// 定制404页面 use定制中间件
app.use(function(req, res) {
    // res.type('text/plain')
    // res.status(404)
    // res.send('404 - NOT FOUND')
    res.status(404)
    res.render('404')
})

// 定制500页面
app.use(function(err, req, res, next) {
    // console.log(err.stack)
    // res.type('text/plain')
    // res.status(500)
    // res.send('500 - Server Error')
    console.log(err.stack)
    res.status(500)
    res.render(500)
})

// 路由定义在监听接口上方
app.listen(app.get('port'), function() {
    console.log('Express started on http://localhost:' + app.get('port') + '; Press Ctrl-C to terminate.')
})