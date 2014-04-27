var koa = require('koa'),
    views = require('co-views'),
    path = require('path'),
    app = koa(),
    render = views(path.resolve(__dirname,  '../', 'client/views'), { ext: 'jade' });

app.use( function *( next ) {
  var start = new Date;
  yield next;
  var ms = new Date - start;
  console.log('%s %s - %s', this.method, this.url, ms);
});

// response
app.use( function *() {
  this.body = yield render('index');
});

app.listen(3000);
console.log('App listening on port 3000, env:', app.env);
