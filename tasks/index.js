'use strict';

var parse = require('./../lib/index');
var process = require('grunt-process/lib');

module.exports = function (grunt) {
	grunt.registerMultiTask('pragma', function () {
		var options = this.options({
			if: function (params, inner, source) {
				return this[params[0]] ? inner : '';
			},
			unless: function (params, inner, source) {
				return this[params[0]] ? '' : inner;
			}
		});

		process(grunt, this.files, {
			process: function (src, dest, content, fileObject) {
				return parse(content, options);
			}
		}, this.async());
	});
};
