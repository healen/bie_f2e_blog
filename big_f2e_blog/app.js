var http = require("http");
var path = require("path");
var express = require("express");
var bodyParser = require("body-parser");
var multer = require("multer");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var logger = require("morgan");
var ejs = require("ejs");
var ueditor = require("ueditor");
var BASE_DIR = __dirname;
var app = express();

/*路由配置*/
var Routes = {
	/*前台*/
	frout: {
		routes: require("./routes/front_end"),
		member: require("./routes/front_end/member"),
		account: require("./routes/front_end/account")
	},

	/*后台*/
	admin: {
		admin: require("./routes/back_end"),
		member_mana: require("./routes/back_end/member_mana"),
		article_mana: require("./routes/back_end/article_mana"),
		pice_mana: require("./routes/back_end/pice_mana"),
		timeline_mana: require("./routes/back_end/timeline_mana"),
		statistic_mana: require("./routes/back_end/statistic_mana"),
		system_config: require("./routes/back_end/system_config"),
	}
}
	
/*使用中间件*/
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(cookieParser());
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: false,
	cookie: {
		maxAge: 1000 * 60 * 10
	}
}));

/*编辑器*/
app.use("back_end/lib/ueditor/ue", ueditor(path.join(__dirname, 'static'), function(req, res, next) {
	// ueditor 客户发起上传图片请求
	if (req.query.action === 'uploadimage') {
		var foo = req.ueditor;
		var date = new Date();
		var imgname = req.ueditor.filename;

		var img_url = 'back_end/lib/ueditor/image';
		res.ue_up(img_url); //你只要输入要保存的地址 。保存操作交给ueditor来做
	}
	//  客户端发起图片列表请求
	else if (req.query.action === 'listimage') {
		var dir_url = 'back_end/lib/ueditor/image';
		res.ue_list(dir_url); // 客户端会列出 dir_url 目录下的所有图片
	}
	// 客户端发起其它请求
	else {

		res.setHeader('Content-Type', 'application/json');
		res.redirect('/lib/ueditor/config.json')
	}
}));

app.use("/cdn/admin", express.static(path.join(BASE_DIR, "static", "back_end")));
app.use("/cdn", express.static(path.join(BASE_DIR, "static", "front_end")));
app.set("views", path.join(path.join(BASE_DIR, "views")));
app.engine("html", ejs.__express);
app.set("view engine", "html");
app.set('port', process.env.PORT || 3000);



app.use("/", Routes.frout.routes);

app.use("/member", Routes.frout.member);

app.use("/account", Routes.frout.account);



/*后台模块*/
app.use("/admin", Routes.admin.admin);
app.use("/admin/member_mana", Routes.admin.member_mana);
app.use("/admin/article_mana", Routes.admin.article_mana);
app.use("/admin/pice_mana", Routes.admin.pice_mana);
app.use("/admin/timeline_mana", Routes.admin.timeline_mana);
app.use("/admin/statistic_mana", Routes.admin.statistic_mana);
app.use("/admin/system_config", Routes.admin.system_config);





app.listen(app.get('port'), function() {
	console.log("server start success on %s \n Ctrl+c stop server", app.get('port'));
})
