var levelup = require('levelup'),
    Q = require('q'),
    db = levelup('./mydb');

exports.getByKey = function getByKey ( key ) {
  var deferred = Q.defer();
  // 3) fetch by key
  db.get(key, function (err, value) {
    if (err) return deferred.reject(err); // likely the key was not found

    // ta da!
    console.log('name=' + value);
    deferred.resolve(value);
  });

  return deferred.promise;
};

exports.putValue = function putValue ( key, value ) {
  var deferred = Q.defer();

  db.put(key, value, function ( err ) {
    if (err) return deferred.reject(err);
    deferred.resolve(true);
  });

  return deferred.promise;
}
