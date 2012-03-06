fs = require 'fs'
to = require './toCSS.coffee'

object =
	html:
		background: 'red'
		body:
			color: 'rgb(255, 255, 255)'
			'div > p':
				color: 'green'
				border: '#000008'
	input :
		border : '1px solid #110011'

file = fs.createWriteStream 'file.css',
	flags: 'a'
	encoding: 'utf-8'
	mode: 0666

file.on 'error', (error) ->
	console.error error

file.write to.toCSS object

file.end ->
	console.log to.toCSS object
