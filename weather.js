var reipjson = get("GET","https://ipinfo.io/json?");

window.onload=function () {
	var xhr,
		address = document.querySelector('.address'),
		time = document.querySelector('.he_r_t'),
		comf = document.querySelector('.he_r_comf'),
		condition = document.querySelector('.t_t_c'),
		temperature = document.querySelector('.t_t_d'),
		wind = document.querySelector('.t_b_w'),
		disparity = document.querySelector('.t_b_t');
	reipjson.onload=function () {
		if (reipjson.readyState===4&&reipjson.status===200) {
			ip=reipjson.response.ip;
			city=reipjson.response.region;
			var recity = get("GET","https://api.heweather.com/x3/weather?","key=f3a33f760a1f4074866c58a64c1e828b","&city=",city);
			recity.onload=function () {
				if(recity.readyState===4&&recity.status===200){
					var re = recity.response["HeWeather data service 3.0"][0];
					address.innerHTML = re.basic.city;
					time.innerHTML=re.daily_forecast["0"].date;
					comf.innerHTML = re.suggestion.comf.brf;
					condition.innerHTML = re.now.cond.txt;
					temperature.innerHTML = re.now.tmp+"℃";
					wind.innerHTML = re.now.wind.dir+re.now.wind.sc+"级";
					disparity.innerHTML = re.daily_forecast["0"].tmp.min+"℃~"+re.daily_forecast["0"].tmp.max+"℃";
					newtag('.he_r_sr','span',re.daily_forecast["0"].astro.sr);
					newtag('.he_r_ss','span',re.daily_forecast["0"].astro.ss);
					newtag('.air_q','span',re.aqi.city.qlty);
					newtag('.air_a_aqi','span',re.now.hum+"%");
					newtag('.air_a_pm','span',re.aqi.city.pm25);
					newtag('.flu',"b",re.suggestion.flu.brf);
					newtag('.drsg',"b",re.suggestion.drsg.brf);
					newtag('.trav',"b",re.suggestion.trav.brf);
					newtag('.sport',"b",re.suggestion.sport.brf);
					newtag('.cw',"b",re.suggestion.cw.brf);
					newtag('.uv',"b",re.suggestion.uv.brf);
					newtag('.flu','span',re.suggestion.flu.txt);
					newtag('.drsg','span',re.suggestion.drsg.txt);
					newtag('.trav','span',re.suggestion.trav.txt);
					newtag('.sport','span',re.suggestion.sport.txt);
					newtag('.cw','span',re.suggestion.cw.txt);
					newtag('.uv','span',re.suggestion.uv.txt);
				}
			}
		}
	}
}
function newtag(getfather,tag,content) {
	var getfather = document.querySelector(getfather);
	var tag = document.createElement(tag);
	tag.innerHTML=content;
	getfather.appendChild(tag);
}
function get(method,api,key,val1,val2,val3) {
	xhr = new XMLHttpRequest();
	var url = api+val(key)+val(val1)+val(val2)+val(val3);
	xhr.open(method,url);
	xhr.responseType="json";
	xhr.send();
	return xhr;
}
function val(v){
	if (v==undefined) {return ""}else{return v}
}