var repl = require('repl'),
	$ = require('jquery'),
	rest = require('restler'),
	util = require('util'),
	jsdom = require('jsdom'),
	options = {},
	rs,
	ctx;

require('colors');

rs = repl.start('=) ');

ctx = rs.context;

ctx.$ = $;
ctx.rest = rest;
ctx.util = util;
ctx.site = false;

rs.defineCommand('get', {
	'help': 'Get a URL and put its contents into "result".',
	'action': function(url) {
		var self = this,
			$ = this.context.$,
			rest = this.context.rest;
		
		if (url.match(/^\//)) { url = 'http://' + self.context.site + url; }
		
		self.outputStream.write('Getting : '.magenta + url.yellow);
		rest.get(url, options).on('success', function(data, response) {
			self.outputStream.write(' [done]\n'.white);
			self.outputStream.write(' (' + (response.statusCode + '').green + ');\n\n');
			self.outputStream.write(util.inspect(data, false, null, true));
			self.context.result = data;
			self.context.response = response;
			self.outputStream.write("\n\n");
			self.displayPrompt();
		}).on('error', function(data, response) {
			self.outputStream.write(' [done]\n'.white);
			self.outputStream.write(' (' + (response.statusCode + '').green + ');\n\n');
			self.outputStream.write(util.inspect(data, false, null, true));
			self.context.result = data;
			self.context.response = response;
			self.outputStream.write("\n\n");
			self.displayPrompt();
		});
	}
});

rs.defineCommand('load', {
	'help': 'Load a document into the current $ context',
	'action': function(url) {
		var self = this;
		
		if (url.match(/^\//)) { url = 'http://' + self.context.site + url; }
		
		self.outputStream.write('Getting : '.magenta + url.yellow);
		jsdom.env({'html':url, 'done':function(errors, window) {
			self.outputStream.write(' [done]\n'.white);
			self.context.$ = $.create(window);
			self.displayPrompt();
		}});
	}
});

rs.defineCommand('pws', {
	'help': 'Prints the working site url',
	'action': function() {
		if (this.context.site !== false) {
			this.outputStream.write(this.context.site.white + "\n");
		}
		this.displayPrompt();
	}
});

rs.defineCommand('cs', {
	'help': 'Change the current working site url',
	'action': function(url) {
		this.context.site = url;
		this.prompt = 'http://' + url + ' =) ';
		this.displayPrompt();
	}
});

rs.defineCommand('creds', {
	'help': 'Enter in your basic auth creds',
	'action': function(args) {
		var args = args.split(' ');
		options.username = args[0];
		options.password = args[1];
		this.outputStream.write("Credentials set.".white + "\n");
		this.displayPrompt();
	}
});