import express from "express";
import path from "path";
import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import webpackConfig from "../webpack.config";
import bodyparser from "body-parser";
import connection from "./connection";
import routes from "./routes";

var allowCrossDomain = function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
}

var app = express();
const compiler = webpack(webpackConfig);
app.use(webpackDevMiddleware(compiler,{
    hot:true,
    publicPath: webpackConfig.output.publicPath,
    noInfo:true
}));
app.use(webpackHotMiddleware(compiler));
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());
app.use(allowCrossDomain);
connection.init();
routes.configure(app);

var server = app.listen(3000, function() {
    console.log("Server listening on port " + server.address().port);
});
