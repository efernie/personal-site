var koa = require('koa'),
    views = require('co-views'),
    common = require('koa-common'),
    serve = common.static,
    compress = common.compress,
    path = require('path'),
    router = require('koa-router'),
    app = koa(),
    config = require('./config')[app.env],
    render = views(path.resolve(__dirname,  '../', 'client/views'), { ext: 'jade' });

app.use( compress() );
app.use( serve( path.resolve(__dirname,  '../', 'client/') ) );
app.use( router(app) );

app.use( function *( next ) {
  var start = new Date;
  yield next;
  var ms = new Date - start;
  console.log('%s %s - %s', this.method, this.url, ms);

});

app.get('/', function *(next) {
  this.locals = {
    env: app.env,
    host: 'http://' + this.req.headers.host.slice( 0, this.req.headers.host.indexOf(':') ) + ':35729/livereload.js?snipver=1'
  };

  this.body = yield render('index', this.locals);
});

app.listen(config.port);

console.log('App listening on port ' + config.port + ', env:', app.env);
// npm prune --production