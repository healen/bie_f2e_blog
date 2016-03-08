var http = require("http");
var path = require("path");
var express = require("express");
var bodyParser = require("body-parser");
var multer = require("multer");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var logger = require("morgan");
var ejs=require("ejs")
var port = (process.env.POST || 3000);
var BASE_DIR = __dirname;
var app = express();



var routes=require("./routes");
var admin=require("./routes/admin")

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
	 secret:'secret',
	 resave:true,
	 saveUninitialized:false,
	cookie:{
		maxAge:1000*60*10
	}
}));


// app.use(function(req, res, next){
// 	  res.locals.user = req.session.user;
// 	  // var err = req.session.error;
// 	  // res.locals.message = '';
// 	  // if (err) res.locals.message = '<div style="margin-bottom: 20px;color:red;">' + err + '</div>';
// 	  next();
// });

app.use("/adm",express.static(path.join(BASE_DIR,"static","back_end")));
app.use(express.static(path.join(BASE_DIR,"static","front_end")));

app.set("views",path.join(path.join(BASE_DIR,"views")));
app.engine("html",ejs.__express);
app.set("view engine","html");




app.use("/admin",admin);



app.listen(port,function(){
	console.log("server start success on %s \n Ctrl+c stop server",port);
})