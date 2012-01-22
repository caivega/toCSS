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