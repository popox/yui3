YUI.add("calendar",function(c){var s=c.ClassNameManager.getClassName,n="calendar",e=40,p=38,t=37,i=39,f=13,g=32,m=s(n,"header"),d=s(n,"day-selected"),b=s(n,"day-highlighted"),r=s(n,"day"),a=s(n,"prevmonth-day"),o=s(n,"nextmonth-day"),j=s(n,"grid"),k=c.DataType.Date,q=c.delegate,u=s(n,"pane"),h=c.UA.os;function l(v){l.superclass.constructor.apply(this,arguments);}c.Calendar=c.extend(l,c.CalendarBase,{_keyEvents:[],_highlightedDateNode:null,_lastSelectedDate:null,initializer:function(){this.plug(c.Plugin.CalendarNavigator);this._keyEvents=[];this._highlightedDateNode=null;this._lastSelectedDate=null;},_bindCalendarEvents:function(){var v=this.get("contentBox"),w=v.one("."+u);w.on("selectstart",function(x){x.preventDefault();});w.delegate("click",this._clickCalendar,"."+r+", ."+a+", ."+o,this);w.delegate("keydown",this._keydownCalendar,"."+j,this);w.delegate("focus",this._focusCalendarGrid,"."+j,this);w.delegate("focus",this._focusCalendarCell,"."+r,this);w.delegate("blur",this._blurCalendarGrid,"."+j+",."+r,this);},_highlightDateNode:function(w){this._unhighlightCurrentDateNode();var v=this._dateToNode(w);v.focus();v.addClass(b);},_unhighlightCurrentDateNode:function(){var v=this.get("contentBox").all("."+b);if(v){v.removeClass(b);}},_getGridNumber:function(w){var v=w.get("id").split("_").reverse();return parseInt(v[0],10);},_blurCalendarGrid:function(v){this._unhighlightCurrentDateNode();},_focusCalendarCell:function(v){this._highlightedDateNode=v.target;v.stopPropagation();},_focusCalendarGrid:function(v){this._unhighlightCurrentDateNode();this._highlightedDateNode=null;},_keydownCalendar:function(D){var x=this._getGridNumber(D.target),z=!this._highlightedDateNode?null:this._nodeToDate(this._highlightedDateNode),F=D.keyCode,w=0,y="";switch(F){case e:w=7;y="s";break;case p:w=-7;y="n";break;case t:w=-1;y="w";break;case i:w=1;y="e";break;case g:case f:D.preventDefault();if(this._highlightedDateNode){var C=this.get("selectionMode");if(C==="single"&&!this._highlightedDateNode.hasClass(d)){this._clearSelection(true);this._addDateToSelection(z);}else{if(C==="multiple"||C==="multiple-sticky"){if(this._highlightedDateNode.hasClass(d)){this._removeDateFromSelection(z);}else{this._addDateToSelection(z);}}}}break;}if(F==e||F==p||F==t||F==i){if(!z){z=k.addMonths(this.get("date"),x);w=0;}D.preventDefault();var E=k.addDays(z,w),v=this.get("date"),B=k.addMonths(this.get("date"),this._paneNumber-1),A=new Date(B);B.setDate(k.daysInMonth(B));if(k.isInRange(E,v,B)){this._highlightDateNode(E);}else{if(k.isGreater(v,E)){if(!k.isGreaterOrEqual(this.get("minimumDate"),v)){this.set("date",k.addMonths(v,-1));this._highlightDateNode(E);}}else{if(k.isGreater(E,B)){if(!k.isGreaterOrEqual(A,this.get("maximumDate"))){this.set("date",k.addMonths(v,1));this._highlightDateNode(E);}}}}}},_clickCalendar:function(y){var z=y.target,w=z.hasClass(r)&&!z.hasClass(a)&&!z.hasClass(o),v=z.hasClass(d);switch(this.get("selectionMode")){case ("single"):if(w){if(!v){this._clearSelection(true);this._addDateToSelection(this._nodeToDate(z));}}break;case ("multiple-sticky"):if(w){if(v){this._removeDateFromSelection(this._nodeToDate(z));}else{this._addDateToSelection(this._nodeToDate(z));}}break;case ("multiple"):if(w){if(!y.metaKey&&!y.ctrlKey&&!y.shiftKey){this._clearSelection(true);this._lastSelectedDate=this._nodeToDate(z);this._addDateToSelection(this._lastSelectedDate);}else{if(((h=="macintosh"&&y.metaKey)||(h!="macintosh"&&y.ctrlKey))&&!y.shiftKey){if(v){this._removeDateFromSelection(this._nodeToDate(z));this._lastSelectedDate=null;}else{this._lastSelectedDate=this._nodeToDate(z);this._addDateToSelection(this._lastSelectedDate);}}else{if(((h=="macintosh"&&y.metaKey)||(h!="macintosh"&&y.ctrlKey))&&y.shiftKey){if(this._lastSelectedDate){var x=this._nodeToDate(z);this._addDateRangeToSelection(x,this._lastSelectedDate);this._lastSelectedDate=x;}else{this._lastSelectedDate=this._nodeToDate(z);this._addDateToSelection(this._lastSelectedDate);}}else{if(y.shiftKey){if(this._lastSelectedDate){var x=this._nodeToDate(z);this._clearSelection(true);this._addDateRangeToSelection(x,this._lastSelectedDate);this._lastSelectedDate=x;}else{this._clearSelection(true);this._lastSelectedDate=this._nodeToDate(z);this._addDateToSelection(this._lastSelectedDate);}}}}}}break;}if(w){this.fire("dateClick",{cell:z,date:this._nodeToDate(z)});}else{if(z.hasClass(a)){this.fire("prevMonthClick");}else{if(z.hasClass(o)){this.fire("nextMonthClick");}}}},subtractMonth:function(v){this.set("date",k.addMonths(this.get("date"),-1));if(v){v.halt();}},subtractYear:function(v){this.set("date",k.addYears(this.get("date"),-1));if(v){v.halt();}},addMonth:function(v){this.set("date",k.addMonths(this.get("date"),1));if(v){v.halt();}},addYear:function(v){this.set("date",k.addYears(this.get("date"),1));if(v){v.halt();}}},{NAME:"calendar",ATTRS:{selectionMode:{value:"single"},date:{value:new Date(),lazyAdd:false,setter:function(A){var w=this._normalizeDate(A),x=k.addMonths(w,this._paneNumber-1);var y=this.get("minimumDate");var z=this.get("maximumDate");if((!y||k.isGreaterOrEqual(w,y))&&(!z||k.isGreaterOrEqual(z,x))){return w;}else{if(y&&k.isGreater(y,w)){return y;}else{if(z&&k.isGreater(x,z)){var v=k.addMonths(z,-1*(this._paneNumber-1));return v;}}}}},minimumDate:{value:null,setter:function(x){if(x){var w=this.get("date"),v=this._normalizeDate(x);if(w&&!k.isGreaterOrEqual(w,v)){this.set("date",v);}return v;}else{return this._normalizeDate(x);}}},maximumDate:{value:null,setter:function(x){if(x){var v=this.get("date"),w=this._normalizeDate(x);if(v&&!k.isGreaterOrEqual(x,k.addMonths(v,this._paneNumber-1))){this.set("date",k.addMonths(w,-1*(this._paneNumber-1)));}return w;}else{return x;}}}}});},"@VERSION@",{requires:["calendar-base","calendarnavigator"],lang:["de","en","fr","ja","nb-NO","pt-BR","ru","zh-HANT-TW"]});