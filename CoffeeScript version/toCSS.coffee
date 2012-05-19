###
- toCSS
- This module provides a function that converts {object}
- into valid and formatted CSS code presented by a string.
- The resulting string can be added to an existing file.
- In addition, toCSS supports:
-   * Extended syntax including nested rules
-   * Minification for color notation:
- 	    * RGB notation into a HEX triplet.
- 	    * Reducing the 6-digit HEX triplet up to 3-digit
-
- string toCSS (Object object [, bool minify = false])
-
- @author: Alexander Guinness <monolithed@gmail.com>
- @param: {Object} object
- @param: {Boolen} minify - Minification
- @return: {string} string
- @version: 1.0
- @license: MIT
- @date: Mon Feb 06 02:00:00 2012
###

'use strict'

toCSS = new ->
	factory =
		data: {}

		###
		- The final conversion of the {object} into a string
		- Original object:
		- 'a b' : ['property: value;', ...]
		-
		- Output string:
		- a b {
		-	property: value;
		-   ...
		- }
		-
		- @param: {Object} object
		- @param: {Boolean} minify
		- @param: {Array} rule
		- @return: {string} String
		###
		build: (object, minify, rule = []) ->
			@parse object

			for key, value of @data
				rule.push key, '{\n', value.join(''), '}\n\n' if value.length

			rule = rule.join ''
			if minify then @minify rule else rule

		###
		- This function takes a {Object} and recursively bypasses branches.
		- Keys are collected in the 'CSS-rules' and properties are stored in a list.
		-
		- Original object:
		- a : {
		- 	b : {
		- 		property: 'value',
		-		...
		- 	}
		- }
		-
		- Output object:
		- 'a b' : ['property: value;', ...]
		-
		- @param: {Object} object
		- @param: {Array} rule
		- @return: The result is stored in the {data} object
		###
		parse: (object, rule = []) ->
			@data[rule] = [] if rule

			for key, value of object
				if @is value
					@parse value, "#{rule}#{key} "
				else
					this.data[rule].push "\t #{key}: #{@format_colors.init(value)};\n"

		format_colors:
			###
			- This function is responsible for minimizing the CSS colors
			- rgb (255, 255, 255) -> #FFFFFF - > #FFF
			- @param: {String} color
			- @return: {String}
			###
			init: (color) ->
				@to_short_hex @rgb_to_hex color

			###
			- Reduces the 6-digit HEX triplet up to 3-digit
			- #110011 -> #101
			- @param: {String} text
			- @return: {String}
			###
			to_short_hex: (text) ->
				match = text.match /#([\da-fA-F]{6})\b/

				if !match
					return text

				slice = (diff) ->
					hex = match[1]

					'#' + hex.split('').filter (element, index) ->
						hex[index] if (if diff then ++index else index) % 2
					.join ''

				return if slice(1) is slice 0 then slice 1 else text

			###
			- Convert RGB notation into a HEX triplet
			- rgb (255, 255, 255) -> #FFFFFF
			- @param: {String} text
			- @return: {String}
			###
			rgb_to_hex: (text) ->
				match = text.match /rgb\s*\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)/

				return '#' + match.map (element, i) ->
					i and (if !element[1] then 0 else '') + (element | 0).toString(16) or ''
				.join('').toUpperCase() if match

				return text
		###
		- Compares the object type
		- @param: {Object} object
		- @return: {Boolean}
		###
		is: (object) ->
			Object::toString.call(object) is '[object Object]'

		###
		- Minification
		- Original string:
		- a {
		-	property: value;
		- }
		-
		- Output string:
		- a { property: value; }
		-
		- @param: {text} String
		- @return: {String}
		###
		minify: (text) ->
			return text.replace /[\n\t]|\s{2,}/g, ' '

	(object, minify) ->
		if !factory.is object
			throw new Error 'There\'re no any objects to parse!'
		factory.build object, minify

exports.toCSS = toCSS;