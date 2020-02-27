function runInPage(code){
	chrome.tabs.getSelected(null, function(tab){
		chrome.tabs.executeScript(tab.id, {
			code: code
		}, function(response){
		});
	});
}

function alertInPage(alert_content){
	runInPage("alert(" + alert_content + ");");
}

function removeInClass(class_name, from, to){
	runInPage('var elements = document.getElementsByClassName("' + class_name + '"); for (var i = 0; i < elements.length; i++) {var content = elements[i].innerHTML; var newcontent = content.replace(' + from + ', "' + to + '"); elements[i].innerHTML = newcontent;}');
}

function removeInTag(tag_name, from, to){
	runInPage('var elements = document.getElementsByTagName("' + tag_name + '"); for (var i = 0; i < elements.length; i++) {var content = elements[i].innerHTML; var newcontent = content.replace(' + from + ', "' + to + '"); elements[i].innerHTML = newcontent;}');
}

function removeInId(id_name, from, to){
	runInPage('var elements = document.getElementById("' + id_name + '"); var content = elements.innerHTML; var newcontent = content.replace(' + from + ', "' + to + '"); elements.innerHTML = newcontent;')
}

var annoying_message = /Focusing on grades can be stressful. We have reduced your focus until a later time/;

chrome.tabs.onUpdated.addListener( function (tabid, changeinfo, tab) {
	if(changeinfo.status == 'complete'){
		removeInClass('tooltip', /5px/gi, "0px");
		removeInClass('final_grade', /5px/gi, "0px");
		removeInTag('H1', annoying_message, "Focus for Canvas extension was used to bypass the blur.");
	}
});