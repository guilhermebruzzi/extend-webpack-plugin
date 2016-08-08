# Extend Webpack Plugin

A simple helper to extend another webpack plugin's functionality.

This will extend the other plugin's prototype to your one and copy the callbacks that the other plugin appends to the compiler on a property named compilerCallbacks.

## Install

```bash
$ npm install --save-dev extend-webpack-plugin
```

## Usage

Ensure you have webpack installed, e.g. `npm install -g webpack`

## Example extending static-site-generator-webpack-plugin

After installing our plugin and the plugin you want to extend ([static-site-generator-webpack-plugin](https://github.com/markdalgleish/static-site-generator-webpack-plugin) in the following example) you can start coding your extension

```bash
$ npm install --save-dev extend-webpack-plugin static-site-generator-webpack-plugin
```

### my-custom-plugin.js

```js
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
```

### webpack.config.js

```js
const MyCustomStaticSiteGeneratorPlugin = require('./my-custom-plugin');

const paths = [
  '/hello/',
  '/world/'
];

const locals = {};

module.exports = {

  entry: {
    'main': './index.js'
  },

  output: {
    filename: 'index.js',
    path: 'build',
    libraryTarget: 'umd'
  },

  plugins: [
    new MyCustomStaticSiteGeneratorPlugin('main', paths, locals)
  ]

};
```

### index.js

```js
// Client render (optional):
if (typeof document !== 'undefined') {
  console.log('Client render code goes here...');
}

// Exported static site renderer:
module.exports = function render(locals, callback) {
  callback(null, '<html>' + locals.greet + ' on ' + locals.path + '</html>');
};
```

## API

As you can see in the previous example (full code [here](https://github.com/guilhermebruzzi/extend-webpack-plugin/tree/master/example)), you can extend a plugin by:

Calling ExtendWebpackPlugin on constructor:

* ExtendWebpackPlugin(plugin, args)
  * plugin: your plugin's instance that you want to extend functionality from another one
  * args: an array of arguments to the parent plugin (you will probably just pass javascript especial arguments variable)
  * this function returns the plugin instance with a property named compilerCallbacks:
    * for each function that the original plugin appends to webpack's compiler.plugin(name, callback), compilerCallbacks will have a property: compilerCallbacks[name] = callback

```js
  function MyCustomStaticSiteGeneratorPlugin() {
    const compilerCallbacks = ExtendWebpackPlugin(this, arguments).compilerCallbacks;
    this.emitCallback = compilerCallbacks['emit'];
  }
```

Then you will call inheritsFrom function of your plugin to the other.

This is a special function that ExtendWebpackPlugin create on Function.prototype, that extend the other plugin's prototype and create a property named parent on your plugin:

```js
  MyCustomStaticSiteGeneratorPlugin.inheritsFrom(StaticSiteGeneratorWebpackPlugin);
```

Finally create your own apply function and create custom steps before or after calling the original plugin's callback

```js
MyCustomStaticSiteGeneratorPlugin.prototype.apply = function(compiler) {
  var self = this;

  compiler.plugin('emit', function(compiler, done) {
    self.locals.greet = "Hello from custom"; // Extend param
    return self.emitCallback(compiler, done); // call static-site-generator-webpack-plugin's emit callback
  });
};
```

## License

[MIT License](https://github.com/guilhermebruzzi/extend-webpack-plugin/blob/master/LICENSE)
