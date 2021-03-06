﻿var progress;
var shiftStart = 12;
var shiftEnd = 18;
var maxProgress = 8;
var maxTime = 9;
var inputHour;
var inputMin;
var Date;
var currMins;
var currProgress;
var timeOut;

function loadMain() {
	// setTimeout(testKey(),1000);
	var isVisible = System.Gadget.visible;
	// clearTimeout(timeOut);
	timeOut = setTimeout("loadMain()", 3000);
	// System.Gadget.settingsUI = "settings.html";
	// System.Gadget.onSettingsClosed = settingsClosed;
	progress = document.getElementById("progress");
	with (document.body.style) {
		width = "100px";
		height = "162px";
	}
	background.style.width = "100px";
	background.style.height = "162px";
	background.src = "url(bgblack.png)";
	testKey();
}

window.click(function() {
	document.getElementById("tl").innerHTML = true;
});

function testKey() {
	progress.attachEvent("onkeydown", function(event) {
		if(event.keyCode == 13) {
			shiftStart *= 60;
			shiftEnd *= 60;
			maxProgress *= 60;
			maxTime *= 60;
			Date = new Date();
			currMins = Date.getHours()*60 + Date.getMinutes();
			currProgress = parseInt(((document.getElementById("progress").value.split('+')[0])*60) + parseInt(document.getElementById("progress").value.split('+')[1]));
			var timeLeft = shiftEnd - currMins;
			var progRem = maxProgress - currProgress;
			var xtraTime = 0;
			var timeLost = 0;
			if(timeLeft > progRem) {
				xtraTime = timeLeft - progRem;
				timeLost = 0;
			} else {
				xtraTime = 0;
				timeLost = progRem - timeLeft;
			}
			var currAvg = Math.floor((currProgress)/(currMins - shiftStart)*60);
			var ReqAvg = Math.ceil((progRem)/(shiftEnd - currMins)*60);
			var percent = Math.floor(((currProgress/maxProgress) * 1000)/10);
			document.getElementById("tl").innerHTML = "TL: "+ convert(timeLeft);
			document.getElementById("pr").innerHTML = "PR: "+ convert(progRem);
			document.getElementById("xt").innerHTML = "XT: "+ (xtraTime);
			document.getElementById("lt").innerHTML = "LT: "+ timeLost;
			document.getElementById("ca").innerHTML = "CA: "+ currAvg;
			document.getElementById("ra").innerHTML = "RA: "+ ReqAvg;
			// document.getElementById("progress").value = convert(currProgress);
			document.getElementById("percent").innerHTML = percent + "%";
			var bar = document.getElementById("bar");
			if(percent > 100) percent = 100;
			bar.style.width = ""+(percent*.98)+"%";
			maxTime /= 60;
			maxProgress /= 60;
			shiftEnd /= 60;
			shiftStart /=60;
		}
	});
}

function convert(time) {
	return ((Math.floor(time/60)%12) +":"+ time%60);
}
