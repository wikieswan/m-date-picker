# m-date-picker
date picker for mobile using javascript and acting like native date picker

## what does it look like

![m-date-picker](http://wikieswan.github.io/img/do-not-delete/m-date-picker.jpg)

## usage

### 1 import m-date-picker css and js lib

	<link rel="stylesheet" type="text/css" href="path/to/m-date-picker.css">

	<script type="text/javascript" src="path/to/zepto.js"></script>
	<script type="text/javascript" src="path/to/m-date-picker.js"></script>


tip: m-date-picker.js depends on zepeto.js ,so you should import zepeto.js before

### 2 config props

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
			unitVisable: true,
			local: 'en'
		})
	mdp.show();


## API



name | description | type | default
---------------|---------------|---------------|---------------
foo 		   | foo  | foo| foo





