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
