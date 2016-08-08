const StaticSiteGeneratorWebpackPlugin = require('static-site-generator-webpack-plugin');
const ExtendWebpackPlugin = require('extend-webpack-plugin');

function MyCustomStaticSiteGeneratorPlugin() {
  const compilerCallbacks = ExtendWebpackPlugin(this, arguments).compilerCallbacks;
  this.emitCallback = compilerCallbacks['emit'];
}

MyCustomStaticSiteGeneratorPlugin.inheritsFrom(StaticSiteGeneratorWebpackPlugin);

MyCustomStaticSiteGeneratorPlugin.prototype.apply = function(compiler) {
  var self = this;

  compiler.plugin('emit', function(compiler, done) {
    self.locals.greet = "Hello from custom"; // Extend param
    return self.emitCallback(compiler, done); // call static-site-generator-webpack-plugin's emit callback
  });
};

module.exports = MyCustomStaticSiteGeneratorPlugin;
