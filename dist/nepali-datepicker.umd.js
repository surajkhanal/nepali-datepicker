(function (global, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('../src/index.js'));
  } else {
    global.NepaliDatePicker = factory(global.NepaliDatePicker || {});
  }
})(this, function (mod) {
  return mod;
});
