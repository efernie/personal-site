# My Personal Site
My personal site built using the koa framework as an experiment.

## Libs Used

  - ##### Server
    - [koa](https://github.com/koajs/koa)
    - [jade](https://github.com/visionmedia/jade)
    - [leveldb](https://github.com/rvagg/node-levelup) <-- must use node v0.11.10 (anything higher doesn't work at the moment)
    - [q](https://github.com/kriskowal/q)

  - ##### Client
    - [browserify](https://github.com/substack/node-browserify)
    - [monosocialiconsfont](http://drinchev.github.io/monosocialiconsfont/)

----
##### Running in Development

I am using [nvm](https://github.com/creationix/nvm) to run node v0.11.10 and I am using [nodemon](https://github.com/remy/nodemon) for development to restart everytime I make a change. It runs on port 3000 by default.

```bash
$ nvm use 0.11.10
$ sudo npm run-script startnodemon
```

##### Running Foerver
```bash
$ sudo NODE_ENV=production forever start -c "node --harmony" index.js
````