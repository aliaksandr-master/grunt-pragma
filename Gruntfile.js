'use strict';

var grunto = require('grunto');

module.exports = grunto(function (grunt) {

	grunt.registerTask('default', [
		'test',
		'watch'
	]);

	grunt.registerTask('test', [
		'eslint',
		'clean',
		'pragma',
		'nodeunit'
	]);

	grunt.loadTasks('tasks');

	return {
		eslint: {
			all: [
				'**/*.js',
				'!lib-cov/**/*',
				'!node_modules/**/*'
			]
		},

		clean: [
			'.tmp'
		],

		pragma: {
			options: {
				world: function (params) {
					return params.join('');
				},
				hello: function () {
					return 'HELLO';
				}
			},
			convert: {
				expand: true,
				cwd: 'examples',
				dest: '.tmp',
				src: [
					'**/*.txt'
				]
			}
		},

		nodeunit: {
			tests: [
				'tests/*.js'
			]
		},

		watch: {
			files: [
				'lib/**/*',
				'tests/**/*',
				'tasks/**/*',
				'examples/**/*'
			],
			tasks: [
				'test'
			]
		}
	};
});
