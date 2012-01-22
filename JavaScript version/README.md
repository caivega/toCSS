# toCSS

This module provides a function that converts an {Object} into valid and formatted CSS code presented by a string. <br
 />
The resulting string can be added to an existing file.
In addition, toCSS supports extended syntax including nested rules and minification for color notation:
	- RGB notation into a HEX triplet
	- Reducing the 6-digit HEX triplet up to 3-digit

## Use
*For example you could use the following code:*


**Server side:** Node.js


	`var fs = require("fs");

	var file = fs.createWriteStream('file.css', {
		flags: 'a',
		encoding: 'utf-8',
		mode: 0666
	});

	file.on('error', function(error) {
		console.error(error);
	});

	file.write(
		require('./toCSS.js').toCSS({
			'html': {
				'background': 'red',
				'body': {
					'color' : 'rgb(255, 255, 255)',
					'div > p': {
						'color': 'green',
						'border': '#000008'
					}
				}
			},
			'input' : {
				'border' : '1px solid #110011'
			}
		})
	);

	file.end(function() {
		console.log('Ok!');
	});`

*Then add the following line to the end of toCSS.js:*

	exports.toCSS = toCSS;

**Client side**


	var rules = toCSS({
		'html': {
			'background': 'red',
			'body': {
				'color' : 'rgb(255, 255, 255)',
				'div > p': {
					'color': 'green',
					'border': '#000008'
				}
			}
		},
		'input' : {
			'border' : '1px solid #110011'
		}
	});

	var style = document.createElement('style');
	style.type = 'text/css';

	if (style.styleSheet)
		style.styleSheet.cssText = rules;
	else
		style.innerHTML = rules;

	document.getElementsByTagName('head')[0].appendChild(style);

*Result:*

	#file.css:

	html {
		background: red;
	}

	html body {
		color: #FFF;
	}

	html body div > p {
		color: green;
		border: #000008;
	}

	input {
		border: #101;
	}


* License
    The toCSS module is licensed under the MIT (MIT_LICENSE.txt) license.

* Copyright (c) 2011 [Alexander Guinness] (https://github.com/monolithed)
