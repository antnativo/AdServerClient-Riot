var restify = require("restify");
var fs = require("fs");
function getList() { 
  return JSON.stringify([{ name: "BCAA" }, { name: "Whey" }, { name: "PreWorkout" }]);
}
function getMessage() { 
  return "Sponsored"
}
function componentList() { 
  return "sample"
}

//setup cors
var server = restify.createServer();
server.use(restify.acceptParser(server.acceptable));
server.use(restify.authorizationParser());
server.use(restify.dateParser());
server.use(restify.queryParser());
server.use(restify.jsonp());
server.use(restify.gzipResponse());
server.use(restify.bodyParser());
server.use(restify.CORS());
server.use(restify.fullResponse());
//setup cors
server.opts(/.*/, function (req,res,next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", req.header("Access-Control-Request-Method"));
    res.header("Access-Control-Allow-Headers", req.header("Access-Control-Request-Headers"));
    res.send(200);
    return next();
});
server.get(/\/api\.*/,function indexHTML(req, res, next) {
    fs.readFile(__dirname + '/public/components/sample.js', function (err, data) {
        if (err) {
            next(err);
            return;
        }
        data = "<script>" + data + "</script>" +
          '<sample message ="' + getMessage() + '" list=\'{' + getList() + '}\' wrapper="sidebar-top"></sample>' +
          '<script>riot.mount("' + componentList() + '")</script><style>sample>div>h3{margin-left: 10px !important;margin-right:10px !important;max-width:280px !important;padding: 0px; !important;}sample>div{background: #fff !important;}</style>';

        res.send(200,{
          selector :"#my-ad-placement",
          html:data.toString()
        });
        next();
    });
})
server.get(/(.*)/,restify.serveStatic({
  directory: './public',
  default: 'index.html'
}));

var port = process.env.PORT || 8082;
server.listen(port, function () {
  console.log("Server Started. Press Ctrl+c to quit server: http://localhost:8082")
});