// Client render (optional):
if (typeof document !== 'undefined') {
  console.log('Client render code goes here...');
}

// Exported static site renderer:
module.exports = function render(locals, callback) {
  callback(null, '<html>' + locals.greet + ' on ' + locals.path + '</html>');
};
