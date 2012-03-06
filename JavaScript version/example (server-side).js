var fs = require("fs");
var to = require('./toCSS.js');

var object = {
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
}

var file = fs.createWriteStream('file.css', {
	flags: 'a',
	encoding: 'utf-8',
	mode: 0666
});

file.on('error', function(error) {
	console.error(error);
});

file.write(to.toCSS(object));

file.end(function() {
	console.log(to.toCSS(object));
});

//PS: Don't forget to add the following line to the end of toCSS.js:
//exports.toCSS = toCSS;