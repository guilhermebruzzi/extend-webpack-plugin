const assert = require('assert');

Function.prototype.inheritsFrom = function( parentClassOrObject ){
  this.prototype = new parentClassOrObject;
  this.prototype.constructor = this;
  this.prototype.parent = parentClassOrObject.prototype;
  return this;
};

const copyCompiler = {
  callbacks: {},
  plugin: function(type, callback) {
    this.callbacks[type] = callback;
  }
}

function ExtendWebpackPlugin(plugin, args) {
  assert.notEqual(plugin, null, 'The ExtendWebpackPlugin needs a plugin as first parameter');
  plugin.parent.constructor.apply(plugin, args);
  plugin.parent.apply.call(plugin, copyCompiler);
  plugin.compilerCallbacks = copyCompiler.callbacks;
  return plugin;
}

module.exports = ExtendWebpackPlugin;
