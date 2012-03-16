# toCSS

This module provides a function that converts {object} into valid and formatted CSS code presented by a string. <br />
The resulting string can be added to an existing file. <br />
In addition, toCSS supports:

* Extended syntax including nested rules
* Minification for color notation:
    * RGB notation into a HEX triplet.
    * Reducing the 6-digit HEX triplet up to 3-digit

##Synopsis

```coffeescript
string toCSS (Object object [, bool minify = false])
```

## Use
*For example you could use the following code:*

**Server side:**

```coffeescript
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
```
*Result:*

```css
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
```

* License
    The toCSS module is licensed under the MIT (MIT_LICENSE.txt) license.

* Copyright (c) 2011 [Alexander Guinness] (https://github.com/monolithed)