#!/usr/bin/env node

var ghauth = require('ghauth');
var GH = require('github');
var path = require('path');
var minimist = require('minimist');
var exec = require('child_process').exec;

var github = new GH({
	version:'3.0.0',
	headers: {
		'User-Agent': 'create-repository'
	}
});

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

exec('git status', function(err, stdout, stderr) {
	if (stderr.indexOf('Not a git repository') > -1) return console.error('Not a git folder. Maybe you forgot to \'git init\'');

	ghauth({
		configName: 'create-repository',
		scopes: ['repo']
	}, function(err, auth) {
		if (err) throw err;

		github.authenticate({
			type: 'oauth',
			token: auth.token
		});

		github.repos.create({
			name: argv.name,
			description: argv.description
		}, function(err, res) {
			if (err) {
				if (err.message[0] !== '{') throw err; // not json
				err = JSON.parse(err.message);
				console.error(err.errors[0].message);
				process.exit(1);
			}

			exec('git remote', function(err, stdout, stderr) {
				if (err) throw err;

				console.log('Repository created https://github.com/'+auth.user+'/'+argv.name);

				if (stdout.indexOf('origin') > -1) return;

				exec('git remote add origin git@github.com:'+auth.user+'/'+argv.name+'.git', function(err, stdout, stderr) {
					if (err) throw err;

					console.log('Added origin. You might want to: git push -u origin master');
				});
			});
		});
	});
});