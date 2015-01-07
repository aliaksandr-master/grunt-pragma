[![npm](http://img.shields.io/npm/v/grunt-pragma.svg?style=flat-square)](https://www.npmjs.com/package/grunt-pragma)
[![npm](http://img.shields.io/npm/l/grunt-pragma.svg?style=flat-square)](http://opensource.org/licenses/MIT)
[![Dependency Status](https://david-dm.org/aliaksandr-pasynkau/grunt-pragma.svg?style=flat-square)](https://david-dm.org/aliaksandr-pasynkau/grunt-pragma)
[![devDependency Status](https://david-dm.org/aliaksandr-pasynkau/grunt-pragma/dev-status.svg?style=flat-square)](https://david-dm.org/aliaksandr-pasynkau/grunt-pragma#info=devDependencies)
[![Build Status](https://travis-ci.org/aliaksandr-pasynkau/grunt-pragma.svg?branch=master&style=flat-square)](https://travis-ci.org/aliaksandr-pasynkau/grunt-pragma)
[![Coverage Status](https://img.shields.io/coveralls/aliaksandr-pasynkau/grunt-pragma.svg?style=flat-square)](https://coveralls.io/r/aliaksandr-pasynkau/grunt-pragma?branch=master)

# grunt-pragma

[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/aliaksandr-pasynkau/grunt-pragma?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Gruntplugin for create modular macroses, that prepare source files

## Getting Started
This plugin requires Grunt `~0.4.x`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-pragma --save
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-pragma');
```

## The "pragma" task

### Overview
In your project's Gruntfile, add a section named `pragma` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  pragma: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.processors
Type: `String`
Default value: `process.cwd()`

You can use any function as processor of pragma tag specified in options hash.

Any processor function has 3 arguments:
1) params array
2) inner string (or null, if you didn't use block pragma tag)
3) source string (with pragma tag)

example:
```js
grunt.initConfig({
  pragma: {
    convert: {
      options: {
        debugMode: true,

        ifDebug: function (params, inner, source) { // pragma processor
          return this['debugMode'] ? inner : '';
        }

        // in files will be find tags /*@ifDebug:*/ /*:ifDebug@*/ abd /*@ifDebug:@*/
      },
      files: [{
        expand: true,
        cwd: 'examples',
        dest: '.tmp',
        ext: '.php',
        src: [
          '**/*.json'
        ]
      }]
    }
  },
});
```

### Tags

####block tag
pattern: /\/\*@([a-zA-Z0-9_]+):((?!=\*)[^\/]*)\*\/([\s\S]*?)\/\*:\1@\*\//g

examples:
```
before text
/*@somePragmaTag: "someparam1", "someParam2"*/
inner text
/*:somePragmaTag@*/
after text
```
without params
```
before text
/*@somePragmaTag:*/
inner text
/*:somePragmaTag@*/
after text
```
all params must be valid JSON

####inline tag
pattern: /\/\*@([a-zA-Z0-9_]+):((?!=@)[^\*]*)@\*\//gm

examples:
```
before text /*@somePragmaTag: "someparam1", "someParam2" @*/ after text
```
without params
```
before text /*@somePragmaTag:@*/ after text
```
