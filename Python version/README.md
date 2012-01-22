# toCSS

This module provides a function that converts a {dict} into valid and formatted CSS code presented by a string. <br />
The resulting string can be added to an existing file.
In addition, toCSS supports extended syntax including nested rules and minification for color notation:
	- RGB notation into a HEX triplet
	-  Reducing the 6-digit HEX triplet up to 3-digit

## Use
*For example you could use the following code:*

	from toCSS import *

	with open('file.css', 'a', encoding='utf-8') as file:
		file.write(toCSS({
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
		}))

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
