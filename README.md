# My Personal Site
My personal site built using the koa framework as an experiment.

## Libs Used

  - ##### Server
    - [koa](https://github.com/koajs/koa)
    - [jade](https://github.com/visionmedia/jade)

  - ##### Client
    - [browserify](https://github.com/substack/node-browserify)

----
##### Running in Development

I am using [nvm](https://github.com/creationix/nvm) to run node v0.11.12 and I am using [nodemon](https://github.com/remy/nodemon) for development to restart everytime I make a change. It runs on port 3000 by default.

```bash
$ nvm use 0.11.12
$ sudo nodemon --harmony index.js
```

##### Running Foerver
```bash
$ sudo NODE_ENV=production forever start -c "node --harmony" index.js
````