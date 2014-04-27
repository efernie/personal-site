var koa = require('koa'),
    views = require('co-views'),
    path = require('path'),
    router = require('koa-router'),
    app = koa(),
    config = require('./config')[app.env],
    render = views(path.resolve(__dirname,  '../', 'client/views'), { ext: 'jade' });

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

app.listen(config.port);

console.log('App listening on port ' + config.port + ', env:', app.env);
