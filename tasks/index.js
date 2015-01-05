'use strict';

var path = require('path');
var parse = require('./../lib/index');

module.exports = function (grunt) {
	grunt.registerMultiTask('pragma', function () {
		var options = this.options({});

		this.files.forEach(function (f) {
			f.src.filter(function (filepath) {
				if (!grunt.file.exists(filepath)) {
					grunt.log.warn('Source file "' + filepath + '" not found.');
					return false;
				}

                return true;
			}).forEach(function (srcFilePath) {
				var content = grunt.file.read(path.resolve(options.root, srcFilePath));
				var resultContent = parse(content, options);

				grunt.file.write(f.dest, resultContent);
				grunt.log.ok('File "' + f.dest.replace(process.cwd(), '') + '" .' + (f.dest === srcFilePath ? 'processed' : 'created'));
			});
		});
	});
};
