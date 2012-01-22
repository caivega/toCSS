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
			'border' : '1px solid #111111'
		}
	}))