'use strict';

var _ = require('lodash');

var parse = function (content, options) {
	return _.reduce(options.pragma, function (tags, pragma) {
		content.replace(pragma.regExp, function (source) {
			var args = arguments;

			tags.push({
				regExp: pragma.regExp,
				source: source,
				name: args[pragma.name],
				params: args[pragma.attr] == null ? [] : JSON.parse('[' + args[pragma.attr] + ']'),
				inner: args[pragma.inner] || null
			});
		});

		return tags;
	}, []);
};

module.exports = function (content, options) {
	options = _.merge({
		pragma: [
			// /*@regexpName: "hello", 123, ["123", "123123"] */
			// /*:regexpName@*/
			// /*@regexpName: "hello", 123, ["123", "123123"] */123123/*:regexpName@*/
			// /*@regexpName:*/123123/*:regexpName@*/
			// /*@regexpName:@*/
			// /*@regexpName: "hello", 123, ["123", "123123"] @*/
			{
				regExp: /\/\*@([a-zA-Z0-9_]+):((?!=\*)[^\/]*)\*\/([\s\S]*?)\/\*:\1@\*\//g,
				name: 1,
				attr: 2,
				inner: 3
			},
			{
				regExp: /\/\*@([a-zA-Z0-9_]+):((?!=@)[^\*]*)@\*\//gm,
				name: 1,
				attr: 2
			}
		]
	}, options);

	options.pragma = _.result(options, 'pragma');

	_.each(parse(content, options), function (tag) {
		if (!_.has(options, tag.name) || !_.isFunction(options[tag.name])) {
			throw new Error('undefined processor "' + tag.name + '".');
		}

		var macrosResult = options[tag.name].call(options, tag.params, tag.inner, tag.source);

		content = content.replace(tag.source, macrosResult);
	});

	return content;
};
