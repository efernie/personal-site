var koa = require('koa'),
    views = require('co-views'),
    path = require('path'),
    router = require('koa-router'),
    app = koa(),
    render = views(path.resolve(__dirname,  '../', 'client/views'), { ext: 'jade' }),
    port = 3000;

if ( app.env === 'production' ) {
  port = 80;
}

app.use(router(app));

app.use( function *( next ) {
  var start = new Date;
  yield next;
  var ms = new Date - start;
  console.log('%s %s - %s', this.method, this.url, ms);
});

app.get('/', function *(next) {
  this.body = yield render('index');
});

app.listen(port);

console.log('App listening on port ' + port + ', env:', app.env);
