var ghauth = require('ghauth');
var GH = require('github');
var path = require('path');
var minimist = require('minimist');

var pkg = {};
try { pkg = require(path.resolve('package.json'));}
catch(err) {}

var argv = minimist(process.argv, {
	string: ['name', 'description'],
	alias: {
		name: 'n',
		description: 'd'
	},
	default: {
		name: pkg.name,
		description: pkg.description
	}
});

ghauth({
	configName: 'create-repository',
	scopes: ['repo']
}, function(err, auth) {
	if (err) throw err;


	var github = new GH({
		version:'3.0.0',
		headers: {
			'User-Agent': 'create-repository'
		}
	});

	github.authenticate({
		type: 'oauth',
		token: auth.token
	});

	github.repos.create({
		name: argv.name,
		description: argv.description
	}, function(err, res) {
		if (err) throw err;
		console.log(res);
	});
});