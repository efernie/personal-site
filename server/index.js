var express = require('express'),
    ENV = process.env['NODE_ENV'] || 'development',
    config = require('./config')[ENV],
    cons = require('consolidate'),
    http = require('http'),
    app = express(),
    httpServer = http.Server(app),
    publicDir = __dirname + '/../client';


app.configure(function(){
  // logger goes up here
  app.locals.pretty = true;
  app.set('views', __dirname + '/views');
  app.engine('jade', cons.jade);
  app.engine('html', cons.ejs);
  app.set('view engine','jade');

  app.use(express.compress());
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.favicon());

  app.use(express.methodOverride());

  app.use(express.static(publicDir));
  app.use(app.router);
});

app.configure('development', function () {
  app.use(express.errorHandler({
    dumpExceptions : true,
    showStack : true
  }));
});

app.configure('production', function () {
  app.use(express.errorHandler());
});


require('./lib')(app);

httpServer.listen(config.port, function () {
  console.log( 'app listening on port ' + config.port + ' for http - ENV:', ENV );
});
