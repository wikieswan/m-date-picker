(function($){
	//date format
	Date.prototype.format = function(format) {
		var o = {
			"M+" : this.getMonth() + 1, // month
			"d+" : this.getDate(), // day
			"h+" : this.getHours(), // hour
			"m+" : this.getMinutes(), // minute
			"s+" : this.getSeconds(), // second
			"q+" : Math.floor((this.getMonth() + 3) / 3), // quarter
			"S" : this.getMilliseconds()
		// millisecond
		};
		if (/(y+)/.test(format))
			format = format.replace(RegExp.$1, (this.getFullYear() + "")
					.substr(4 - RegExp.$1.length));
		for ( var k in o)
			if (new RegExp("(" + k + ")").test(format))
				format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k]
						: ("00" + o[k]).substr(("" + o[k]).length));
		return format;
	};
	var util = {};
	util.px2number = px2number;
	util.number2Str = number2Str;
	util.daysInMonth = daysInMonth;
	util.cleanStyle = cleanStyle;
	util.getTargetTopNumber = getTargetTopNumber;
	util.getRandomId = getRandomId;
	util.local = {
		'en' : {
			cancelText: 'Cancel',
			okText: 'Ok',
			year: 'year',
			month: 'month',
			day: 'day',
			hour: 'hour',
			'minute': 'minute'
		},
		'zh': {
			cancelText: '取消',
			okText: '确定',
			year: '年',
			month: '月',
			day: '日',
			hour: '时',
			'minute': '分'
		}
	}

	function px2number(strpx){
		var numstr = strpx.replace(/px/,'');
		return numstr*1;
	}
	function number2Str(num){
		if(num<10){
			num = '0'+num
		}
		return num;
	}
	//Month is 1 based
	function daysInMonth(month,year) {
	    return new Date(year, month, 0).getDate();
	}
	function cleanStyle(dom,index){
		if(typeof index==='undefined'){
			$(dom).find('.md-row').removeClass('md-row-0').removeClass('md-row-1').removeClass('md-row-2')
		}
		else{
			$($(dom).find('.md-row')[index]).removeClass('md-row-0').removeClass('md-row-1').removeClass('md-row-2')
		}
	}
	function getTargetTopNumber(target){
		var top = $(target).css('top');
		top  = util.px2number(top)
		return top;
	}
	function getRandomId(prex) {
		if(typeof prex==='undefined'){
			prex = '';
		}
		var str =prex + new Date().getTime() + ''+ Math.round(Math.random(0,1)*10000);
		return str
	}
	/**
		body coding
	**/
	var yYearStart,timeYearStart,
		yMonthStart,timeMonthStart,
		yDatStart,timeDayStart,
		yHourStart,timeHourStart,
		yMinStart,timeMinStart;

	$('body').on('touchstart','.md-col-mask',function(e){
		var touch = e.changedTouches[0]
		if(hasClass(this,'md-year')){
			yYearStart = touch.clientY;
			timeYearStart = e.timeStamp;
		}
		else if(hasClass(this,'md-month')){
			yMonthStart = touch.clientY;
			timeMonthStart = e.timeStamp;
		}
		else if(hasClass(this,'md-day')){
			yDayStart = touch.clientY;
			timeDayStart = e.timeStamp;
		}
		else if(hasClass(this,'md-hour')){
			yHourStart = touch.clientY;
			timeHourStart = e.timeStamp;
		}
		else if(hasClass(this,'md-min')){
			yMinStart = touch.clientY;
			timeMinStart = e.timeStamp;
		}
	})
	$('body').on('touchmove','.md-col-mask',function(e){
		var touch = e.changedTouches[0]
		var yMove,timeMove;
		yMove = touch.clientY;
		timeMove = e.timeStamp;
		if(hasClass(this,'md-year')){
			touchMoveSlide('.md-year',yMove-yYearStart)
		}
		else if(hasClass(this,'md-month')){
			touchMoveSlide('.md-month',yMove-yMonthStart)
		}
		else if(hasClass(this,'md-day')){
			touchMoveSlide('.md-day',yMove-yDayStart)
		}
		else if(hasClass(this,'md-hour')){
			touchMoveSlide('.md-hour',yMove-yHourStart)
		}
		else if(hasClass(this,'md-min')){
			touchMoveSlide('.md-min',yMove-yMinStart)
		}
	})
	$('body').on('touchend','.md-col-mask',function(e){
		var touch = e.changedTouches[0]
		var yEnd,
			timeEnd,
			y0,
			sMinus,
			days,
			year,
			month,
			day;
		yEnd = touch.clientY;
		timeEnd = e.timeStamp;
		if(hasClass(this,'md-year')){
			
			y0 = getTargetTopNumber('.md-year')
			sMinus = touchEndMinusLength(timeEnd,timeYearStart,yEnd,yYearStart)
			y0 = y0 + sMinus;
			touchEndSlide('.md-year',y0);
			reInitDay();
		}
		else if(hasClass(this,'md-month')){
			y0 = getTargetTopNumber('.md-month')
			sMinus = touchEndMinusLength(timeEnd,timeMonthStart,yEnd,yMonthStart)
			y0 = y0 + sMinus;
			touchEndSlideCycle('.md-month',y0,12);
			reInitDay();
		}
		else if(hasClass(this,'md-day')){
			year = getYear();
			month = getMonth();
			days = util.daysInMonth(month,year);
			y0 = getTargetTopNumber('.md-day')
			sMinus = touchEndMinusLength(timeEnd,timeDayStart,yEnd,yDayStart)
			y0 = y0 + sMinus;
			
			touchEndSlideCycle('.md-day',y0,days);
		}
		else if(hasClass(this,'md-hour')){
			y0 = getTargetTopNumber('.md-hour')
			sMinus = touchEndMinusLength(timeEnd,timeHourStart,yEnd,yHourStart)
			y0 = y0 + sMinus;
			touchEndSlideCycle('.md-hour',y0,24);
		}
		else if(hasClass(this,'md-min')){
			y0 = getTargetTopNumber('.md-min')
			sMinus = touchEndMinusLength(timeEnd,timeMinStart,yEnd,yMinStart)
			y0 = y0 + sMinus;
			touchEndSlideCycle('.md-min',y0,60);
		}

	})
	
	function hasClass(target,cssClass){
		return $(target).siblings('.md-col-items').hasClass(cssClass)
	}


	function touchEndMinusLength(timeEnd,timeStart,yTouchEnd,yTouchStart){
		var aMinus = 0.005;
		var t = timeEnd - timeStart,
			s = yTouchEnd - yTouchStart,
			v = 2*s/t,
			vEnd = 2*s/t,
			sMinus = v*v/2/aMinus;
		if(v>0){
			//dowm

		} 
		else{
			//up
			sMinus = -1 * sMinus 
		}
		return sMinus;
	}
	function touchEndSlideCycle(target,y,cycleLen){
		var targetHeight = util.px2number($(target).css('height'))
		var n = targetHeight/40;
		if(y<(7-n)*40){
			y = (7-n)*40
		}
		else if(y>0){
			y = 0
		}
		y = Math.round(y/40)*40;
		$(target).css({
			'transition': 'top 1s',
			'-webkit-transition': 'top 1s',
			'top': y
		});
		$(target).attr('val',yPoitoin2ValCycle(y,cycleLen))
		setTimeout(function(){
			var n = y/40,
				index = -(n-4)%cycleLen,
				yEnd = -(cycleLen+index-4)*40
			$(target).css({
				'transition': 'top 0s',
				'-webkit-transition': '0s',
				'top': yEnd
			})
			
		},1000)
		
		
	}


	function touchEndSlide(target,y,fn){
		var targetHeight = util.px2number($(target).css('height'))
		var n = targetHeight/40;
		if(y<(4-n)*40){
			y = (4-n)*40
		}
		else if(y>3*40){
			y = 3*40
		}
		y = Math.round(y/40)*40;
		$(target).css({
			'transition': 'top 1s',
			'-webkit-transition': 'top 1s',
			'top': y
		});
		$(target).attr('val',yPoitoin2Year(y))
		setTimeout(function(){
			if(typeof fn==='function'){
				fn();
			}
		},1000)
	}

	function touchMoveSlide(target,y){
		var y0 = util.getTargetTopNumber(target)
		var ymove = y0+y/10;
		var targetHeight = util.px2number($(target).css('height'))
		var n = targetHeight/40;
		if(ymove<(3.5-n)*40||ymove>3.5*40){
			return false;
		}
		$(target).css({
			'transition': 'top 0s',
			'-webkit-transition': '0s',
			'top': ymove
		})
	}


	initYear()
	initMonth()
	initDay()
	initHour()
	initMin()
	function initYear(year){
		if(typeof year==='undefined'){
			year = new Date().format('yyyy')
			year = year*1;
		}
		
		var baseYear = 1970;
		var yearHtml = '';
		for(var i=0;i<60;i++){
			yearHtml += '<div class="md-item">'+ (baseYear+i) +'</div>'
		}
		
		$('.md-year').html(yearHtml);
		$('.md-year').css('top',(1970-year+3)*40);
		$('.md-year').attr('val',year);
		
	}
	
	function initMonth(month){
		if(typeof month==="undefined"){
			month = new Date().format('MM')
		}
		initCycle('.md-month',month,12,1,1)
	}
	function reInitDay(){
		var day = getDay(),
			month = getMonth(),
			year = getYear();
		var days = util.daysInMonth(month,year);
		
		initCycle('.md-day',day,days,1)
	}
	
	function initDay(day,month,year){
		if(typeof year==='undefined'){
			year = new Date().format('yyyy')
		}
		if(typeof month==='undefined'){
			month = new Date().format('MM')
		}
		if(typeof day==='undefined'){
			day = new Date().format('dd')
		}
		day = day*1;
		month = month*1;
		year = year*1;
		var days = util.daysInMonth(month,year);
		initCycle('.md-day',day,days,1)
	}
	function initHour(hour){
		if(typeof hour==='undefined'){
			hour = new Date().format('hh')
		}
		initCycle('.md-hour',hour,24,0)
	}

	function initMin(min){
		if(typeof hour==='undefined'){
			min = new Date().format('mm')
		}
		initCycle('.md-min',min,60,0)
	}

	function initCycle(targetHolder,value,cycleLen,indexBegin){
		value = value * 1;
		var html = '';
		for(var n=0;n<3;n++){
			for(var i=0+indexBegin;i<cycleLen+indexBegin;i++){
				html += '<div class="md-item">'+ util.number2Str(i) +'</div>'
			}
		}
		$(targetHolder).css('top',(3+indexBegin-value-cycleLen)*40);
		$(targetHolder).html(html);
		$(targetHolder).attr('val',value);
	}

	function yPoitoin2Year(y){
		y = -1 * y;
		var year = y/40 + 3 + 1970;
		return year;
	}

	function yPoitoin2ValCycle(y,cycleLen){
		var	n = y/40,
			index = -(n-4)%cycleLen;
		return index;
	}
	function getYear(){
		return getVal('.md-year');
	}
	function getMonth(){
		return getVal('.md-month');
	}
	function getDay(){
		return getVal('.md-day');
	}
	function getHour(){
		return getVal('.md-hour');
	}
	function getMin(){
		return getVal('.md-min');
	}
	function getVal(target){
		return $(target).attr('val')*1;
	}
	function defFunction(date){
		return false
	}
	$.mdatepicker =  function (ops) {
		return new mdatepicker(ops)
	}

	function mdatepicker (ops){
		var defOps = {
			mode: 'date',    // date time datetime datemonth
			defaultDate: new Date(),
			okText: 'Ok',
			cancelText: 'Cancel',
			onDateChange: defFunction,
			onCancel: defFunction,
			unitVisable: true,
			local: 'en'
		}
		var self = this,
			text,
			html;
		ops = $.extend(defOps,ops)
		text = util.local[ops.local]
		ops.okText = ops.okText=='Ok'&&ops.local=='zh'?text.okText:ops.okText
		ops.cancelText = ops.cancelText=='Cancel'&&ops.local=='zh'?text.cancelText:ops.cancelText
		
		html = getDatepickerHtml(ops,text);

		self.ops = ops;
		self.obj = $(html);
		
		$.mdatepickerHandle = {
			handleCancel: function() {
				ops.onCancel();
				self.hide();
			},
			handleDateChange: function(){
				var date = self.val();
				ops.onDateChange(date)
				self.hide();
			}
		}
		
		
	}
	mdatepicker.prototype.show = function(){
		var ops = this.ops,
			defaultDate = new Date(ops.defaultDate)
			year = defaultDate.format('yyyy'),
			month = defaultDate.format('MM'),
			day = defaultDate.format('dd'),
			hour = defaultDate.format('hh'),
			minute = defaultDate.format('mm');
		
		this.obj.appendTo('body')
		if(ops.mode==='date'){
			initYear(year)
			initMonth(month)
			initDay(day)
		}
		else if(ops.mode==='time'){
			initHour(hour)
			initMin(minute)
		}
		else if(ops.mode==='datetime'){
			initYear(year)
			initMonth(month)
			initDay(day)
			initHour(hour)
			initMin(minute)
		}
		else if(ops.mode==='datemonth'){
			initYear(year)
			initMonth(month)
		}
		else{

		}
		
	}
	mdatepicker.prototype.hide = function(){
		var self = this;
		setTimeout(function(){
			$(self.obj).remove()
		},300)
	}
	mdatepicker.prototype.val = function(){
		var ops = this.ops,
			year = getYear(),
			month = getMonth(),
			day = getDay(),
			hour = getHour(),
			minute = getMin(),
			date;

		if(ops.mode==='date'){
			date = year + '/' + month + '/' + day;
		}
		else if(ops.mode==='time'){
			date =  hour + ':' + minute
		}
		else if(ops.mode==='datetime'){
			date = year + '/' + month + '/' + day + ' ' + hour + ':' + minute
		}
		else if(ops.mode==='datemonth'){
			date = year + '/' + month
		}
		return date;

	}
	function getDatepickerHtml(ops,text){
		var html = '';
		var bodyHtml = '',
			unitHtml = '',
			headHtml='';
		headHtml = 	
				'<div class="md-head">\
					<div class="md-btn md-cancel" ontouchend="$.mdatepickerHandle.handleCancel()">'+ops.cancelText+'</div>\
					<div class="md-btn md-sure" ontouchend="$.mdatepickerHandle.handleDateChange()">'+ops.okText+'</div>\
				</div>'
		if(ops.mode ==='date'){
			bodyHtml = 
				'<div class="md-body">\
					<div class="md-col md-col-3">\
						<div class="md-col-mask"></div>\
						<div class="md-col-indicator"></div>\
						<div class="md-col-items md-year"></div>\
					</div>\
					<div class="md-col md-col-3">\
						<div class="md-col-mask"></div>\
						<div class="md-col-indicator"></div>\
						<div class="md-col-items md-month"></div>\
					</div>\
					<div class="md-col md-col-3">\
						<div class="md-col-mask"></div>\
						<div class="md-col-indicator"></div>\
						<div class="md-col-items md-day"></div>\
					</div>\
				</div>';
			unitHtml = 	
				'<div class="md-unit">\
					<div class="md-col md-col-3">\
						<div class="md-col-unit">'+text['year']+'</div>\
					</div>\
					<div class="md-col md-col-3">\
						<div class="md-col-unit">'+text['month']+'</div>\
					</div>\
					<div class="md-col md-col-3">\
						<div class="md-col-unit">'+text['day']+'</div>\
					</div>\
				</div>'
		}
		else if(ops.mode ==='time'){
			bodyHtml = 
				'<div class="md-body">\
					<div class="md-col md-col-2">\
						<div class="md-col-mask"></div>\
						<div class="md-col-indicator"></div>\
						<div class="md-col-items md-hour"></div>\
					</div>\
					<div class="md-col md-col-2">\
						<div class="md-col-mask"></div>\
						<div class="md-col-indicator"></div>\
						<div class="md-col-items md-min"></div>\
					</div>\
				</div>';
			unitHtml = 	
				'<div class="md-unit">\
					<div class="md-col md-col-2">\
						<div class="md-col-unit">'+text['hour']+'</div>\
					</div>\
					<div class="md-col md-col-2">\
						<div class="md-col-unit">'+text['minute']+'</div>\
					</div>\
				</div>'
		}
		else if(ops.mode ==='datetime'){
			bodyHtml = 
				'<div class="md-body">\
					<div class="md-col md-col-5">\
						<div class="md-col-mask"></div>\
						<div class="md-col-indicator"></div>\
						<div class="md-col-items md-year"></div>\
					</div>\
					<div class="md-col md-col-5">\
						<div class="md-col-mask"></div>\
						<div class="md-col-indicator"></div>\
						<div class="md-col-items md-month"></div>\
					</div>\
					<div class="md-col md-col-5">\
						<div class="md-col-mask"></div>\
						<div class="md-col-indicator"></div>\
						<div class="md-col-items md-day"></div>\
					</div>\
					<div class="md-col md-col-5">\
						<div class="md-col-mask"></div>\
						<div class="md-col-indicator"></div>\
						<div class="md-col-items md-hour"></div>\
					</div>\
					<div class="md-col md-col-5">\
						<div class="md-col-mask"></div>\
						<div class="md-col-indicator"></div>\
						<div class="md-col-items md-min"></div>\
					</div>\
				</div>';
			unitHtml = 	
				'<div class="md-unit">\
					<div class="md-col md-col-5">\
						<div class="md-col-unit">'+text['year']+'</div>\
					</div>\
					<div class="md-col md-col-5">\
						<div class="md-col-unit">'+text['month']+'</div>\
					</div>\
					<div class="md-col md-col-5">\
						<div class="md-col-unit">'+text['day']+'</div>\
					</div>\
					<div class="md-col md-col-5">\
						<div class="md-col-unit">'+text['hour']+'</div>\
					</div>\
					<div class="md-col md-col-5">\
						<div class="md-col-unit">'+text['minute']+'</div>\
					</div>\
				</div>'
		}
		else if(ops.mode ==='datemonth'){
			bodyHtml = 
				'<div class="md-body">\
					<div class="md-col md-col-2">\
						<div class="md-col-mask"></div>\
						<div class="md-col-indicator"></div>\
						<div class="md-col-items md-year"></div>\
					</div>\
					<div class="md-col md-col-2">\
						<div class="md-col-mask"></div>\
						<div class="md-col-indicator"></div>\
						<div class="md-col-items md-month"></div>\
					</div>\
				</div>';
			unitHtml = 	
				'<div class="md-unit">\
					<div class="md-col md-col-2">\
						<div class="md-col-unit">'+text['year']+'</div>\
					</div>\
					<div class="md-col md-col-2">\
						<div class="md-col-unit">'+text['month']+'</div>\
					</div>\
				</div>'
		}
		else{
			// error date mode
			console.error("mode error,'date' enum('date', 'time', 'datetime','datemonth')")
		}
		unitHtml = ops.unitVisable?unitHtml:'';
		html = 
		'<div class="md-overlayer">\
			<div class="md-wrap">' +
			headHtml +
			unitHtml +
			bodyHtml +
			'</div>\
		</div>';
		return html;
	}

})(Zepto)

















