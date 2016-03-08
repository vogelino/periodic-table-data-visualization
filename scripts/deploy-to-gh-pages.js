var path = require('path');
var ghpages = require('gh-pages');

ghpages.publish(path.join(__dirname, '../public'), function(err) {
	if (err) { throw err; }
	console.log('Successfully deployed to your Github pages');
});
