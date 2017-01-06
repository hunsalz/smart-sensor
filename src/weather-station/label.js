// Label object
var Label = function(timestamp) {
  this.timestamp = timestamp;
};
/**
 * override toString() with custom format
 */
Label.prototype.toString = function() {
  return this.format(this.timestamp);
};
/**
 * format timestamp in custom format
 */
Label.prototype.format = function(timestamp) {
  var value = new Date(timestamp * 1000);
  return [this._pad(value.getHours()), this._pad(value.getMinutes()), this._pad(value.getSeconds())].join(':');
};
/**
 * return always double digits even though the number is singular
 */
Label.prototype._pad = function(value) {
  return value < 10 ? '0' + value.toString(10) : value.toString(10);
};
