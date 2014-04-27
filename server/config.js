var _ = require('lodash');

var baseObj = {
  port: 3000
};

exports.development = baseObj;

var prodObj = pd =  _.cloneDeep(baseObj);

pd.port = 80;

exports.production = prodObj;