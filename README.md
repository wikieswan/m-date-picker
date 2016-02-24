# m-date-picker
date picker for mobile using javascript and acting like native date picker

## what does it look like

<img src="http://wikieswan.github.io/img/do-not-delete/m-date-picker.jpg?v=1" width="400px">

## demo

1 local demo

	git clone this project
	npm install
	gulp 

2 online demo
[http://wikieswan.github.io/m-date-picker/html/index.html](http://wikieswan.github.io/m-date-picker/html/index.html)

open with the QR code image

<img src="http://wikieswan.github.io/img/do-not-delete/m-date-picker-url.jpg" width="200px">

## usage

### 1 import m-date-picker css and js lib

```html

	<link rel="stylesheet" type="text/css" href="path/to/m-date-picker.css">

	<script type="text/javascript" src="path/to/zepto.js"></script>
	<script type="text/javascript" src="path/to/m-date-picker.js"></script>
```

tip: m-date-picker.js depends on zepeto.js ,so you should import zepeto.js before

### 2 config props

```javascript

	var mdp = $.mdatepicker({
			mode: 'date',    // date time datetime datemonth
			defaultDate: '2014/2/1',
			okText: 'Ok',
			cancelText: 'Cancel',
			onDateChange: function(date){
				console.log(date)
			},
			onCancel: function(){
				
			},
			unitVisiable: true,
			local: 'en'
		})
	mdp.show();
```

## API



name | description | type | default
---------------|---------------|---------------|---------------
mode | date picker mode | String | 'date' enum('date', 'time', 'datetime','datemonth')
defaultDate | default selected date | String | now
okText | ok button text | String | 'Ok'
cancelText | cancel button text | String | 'Cancel'
onDateChange | exec on ok | Function(date: String) | 
onCancel | exec on dismiss | function | 
unitVisiable | is unit visiable | boolean | true
local | language to use | String | 'local'  enmu('en','zh')


## License

m-date-picker is released under the MIT license.

