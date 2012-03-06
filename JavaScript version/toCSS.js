/*!
* toCSS
* This module provides a function that converts {object}
* into valid and formatted CSS code presented by a string.
* The resulting string can be added to an existing file.
* In addition, toCSS supports:
*   - Extended syntax including nested rules
*   - Minification for color notation:
* 	    - RGB notation into a HEX triplet.
* 	    - Reducing the 6-digit HEX triplet up to 3-digit
*
* @author: Alexander Guinness <monolithed@gmail.com>
* @param: {Object} object
* @param: {Boolen} minify - Minification
* @return: {string} string
* @version: 1.0
* @license: MIT
* @date: Mon Feb 06 02:00:00 2012
*/

var toCSS = new function() {
	'use strict';

	var factory = {
		data: {},

		/*!
		* The final conversion of the {object} into a string
		* Original object:
		* 'a b' : ['property: value;', ...]
		*
		* Output string:
		* a b {
		*	property: value;
		*   ...
		* }
		*
		* @param: {Object} object
		* @param: {Boolean} minify
		* @return: {String} string
		*/
		build: function(object, minify) {
			var rule = [];

			this.parse(object);

			for (var i in this.data) {
				if (this.data[i].length)
					rule.push(i, '{\n', this.data[i].join(''), '}\n\n');
			}

			rule = rule.join('');

			return minify ? this.minify(rule) : rule;
		},

		/*!
		* This function takes a {Object} and recursively bypasses branches.
		* Keys are collected in the 'CSS-rules' and properties are stored in a list.
		*
		* Original object:
		* a : {
		* 	b : {
		* 		property: 'value',
		*		...
		* 	}
		* }
		*
		* Output object:
		* 'a b' : ['property: value;', ...]
		*
		* @param: {Object} object
		* @param: {Array} rule
		* @return: The result is stored in the {data} object
		*/
		parse: function(object, rule) {
			rule = rule || [];
			this.data[rule] = [];

			for (var i in object) {
				if (this.is(object[i]))
					this.parse(object[i], rule + i + ' ');
				else
					this.data[rule].push('\t' + i + ': ' + this.format_colors.init(object[i]) + ';\n');
			}
		},

		format_colors: {
			/*!
			* This function is responsible for minimizing the CSS colors
			* rgb (255, 255, 255) -> #FFFFFF - > #FFF
			* @param: {String} color
			* @return: {String}
			*/
			init: function(color) {
				return this.to_short_hex(this.rgb_to_hex(color))
			},

			/*!
			* Reduces the 6-digit HEX triplet up to 3-digit
			* #110011 -> #101
			* @param: {String} text
			* @return: {String}
			*/
			to_short_hex: function(text) {
				return text.replace(/#([\da-fA-F]{6})\b/g, function() {
					return RegExp.$1.split('').filter(function(element, i) {
						return i % 2 == i++ % 2 && i % 2;
					}).join('');
				});
			},

			/*!
			* Convert RGB notation into a HEX triplet
			* rgb (255, 255, 255) -> #FFFFFF
			* @param: {String} text
			* @return: {String}
			*/
			rgb_to_hex: function(text) {
				var match = text.match(/rgb\s*\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)/);

				if (match) {
					return '#' + match.map(function(element, i) {
						return 	i && (!element[1] ? 0 : '') + (element|0).toString(16) || '';
					}).join('').toUpperCase();
				}
				return text;
			}
		},

		/*!
		* Minification
		* Original string:
		* a {
		*	property: value;
		* }
		*
		* Output string:
		* a { property: value; }
		*
		* @param: {String} text
		* @return: {String}
		*/
		minify: function(text) {
			return text.replace(/[\n\t]|\s{2,}/g, ' ');
		},

		/*!
		* Compares the object type
		* @param: {Object} object
		* @return: {Boolean}
		*/
		is: function (object) {
			return Object.prototype.toString.call(object) === '[object Object]';
		}
	};

	return function(object, minify) {
		if(!factory.is(object))
			throw new Error('There\'re no any objects to parse!');

		return factory.build(object, minify);
	};
};

exports.toCSS = toCSS;