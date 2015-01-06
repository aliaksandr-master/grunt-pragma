
"use strict";

var parse = require('./lib');

var content = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.';

var contentWithInvalidTag = '/*@invalid:@*/Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.';

var contentWithBlockTag = 'Lorem Ipsum is simply /*@world: "param", 2*/ dummy /*:world@*/ text  simply /*@world:*/or/*:world@*/ the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.';
var contentWithBlockTagResult = 'Lorem Ipsum is simply param2 text  simply  the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.';

var contentWithInlineTag = 'Lorem Ipsum /*@hello:@*/ is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.';
var contentWithInlineTagResult = 'Lorem Ipsum HELLO is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.';

var contentWithBlockANdInlineTag = 'Lorem Ipsum /*@hello:@*/ is simply /*@world: "param", 1*/ dummy /*:world@*/ text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.';
var contentWithBlockANdInlineTagResult = 'Lorem Ipsum HELLO is simply param1 text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.';

module.exports['no tags'] = function (test) {
	test.doesNotThrow(function () {
		var parsedContent = parse(content, {});
		test.equal(content, parsedContent);
	});

	test.done();
};

module.exports['nothing to parse'] = function (test) {
	test.doesNotThrow(function () {
		var parsedContent = parse('', {});
		test.equal('', parsedContent);
	});
	test.done();
};

module.exports['invalid tag'] = function (test) {
	test.throws(function () {
		parse(contentWithInvalidTag, {});
	});
	test.done();
};

module.exports['block tag'] = function (test) {
	test.doesNotThrow(function () {
		test.equal(contentWithBlockTagResult, parse(contentWithBlockTag, {
			world: function (params) {
				return params.join('');
			}
		}));
	});
	test.done();
};

module.exports['inline tag'] = function (test) {
	test.doesNotThrow(function () {
		test.equal(contentWithInlineTagResult, parse(contentWithInlineTag, {
			hello: function () {
				return 'HELLO';
			}
		}));
	});
	test.done();
};

module.exports['block and inline tag'] = function (test) {
	test.doesNotThrow(function () {
		test.equal(contentWithBlockANdInlineTagResult, parse(contentWithBlockANdInlineTag, {
			world: function (params) {
				return params.join('');
			},
			hello: function () {
				return 'HELLO';
			}
		}));
	});
	test.done();
};
