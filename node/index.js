let express = require('express');
let exphbs = require('express-handlebars');
let fortunes = require('./lib/fortunes');

/*
1. nodemon 代码热更新，不用每次都重启服务
2. express-handlebars 模板引擎
3. mocha 前端测试
*/

const app = express();

app.engine('.hbs', exphbs({
	extname: '.hbs'		// 模板文件的后缀名（可修改，一般为handlebars(默认)或hbs，注意需要三个地方一直）
}));
app.set('view engine', '.hbs');

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
	res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
	next();
})

app.get('/', (req, res) => {
	res.render('home');
});

app.get('/about', (req, res) => {
	res.render('about', {
		fortune: fortunes.getRandomFortune(),
		pageTestScript: '/qa/tests-about.js'
	});
	
});
// 404 catch-all 中间件
app.use((req, res) => {
	res.status(404);
	res.render('404', {
		layout: false
	});
});
// 500 错误处理中间件
app.use((err, req, res, next) => {
	console.log(err.stack);
	res.status(500);
	res.render('500', {
		layout: false
	});
});


app.listen(app.get('port'), () => {
	console.log('Express started on http://localhost:' + app.get('port') + ', press Ctrl-C to terminate');

})