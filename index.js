console.log();
$(document).ready(function() {
	$("#logoutBtn").hide();
	$("#welcomeUser").hide();
});
var provider = new firebase.auth.GoogleAuthProvider();
var database = firebase.database();
var user;
var userFound = 0;
$("#loginBtn").click(
	function () {
		firebase.auth().signInWithPopup(provider).then(function(result) {
		var token = result.credential.accessToken;
		user = result.user;
		var userCheck = firebase.database().ref('users');
		userCheck.on('value',function(snapshot){
			var users = snapshot.val();
			var usernames = Object.keys(users);
			for(i=0;i<usernames.length;i++){
				var username = usernames[i];
				if(username == user.displayName){
					userFound = 1;
				};
			};
			if(userFound == 0){
				firebase.database().ref('users/' + user.displayName).set({
					uid: user.uid,
					email: user.email
				});
			};
		});
		login();
		}).catch(function(error) {
			var errorCode = error.code;
			var errorMessage = error.message;
			var email = error.email;
			var credential = error.credential;
		});
	}
);
function login(){
	$("#home").hide();
	$("#loginBtn").hide();
	$("#logoutBtn").show();
	$("#welcomeUser").show();
	$("#welcomeText").html("Welcome, " + user.displayName);
	$("#handlesViewAttendance").hide();
	$("#handlesUpdateAttendance").hide();
};
var enteredMMYYV;
function selectDateV(){
	var enteredMMV = document.getElementById("enteredMMV").value;
	var enteredYYV = document.getElementById("enteredYYV").value;
	enteredMMYYV = enteredMMV + "-" + enteredYYV;
	clearInputsDates();
	$("#descView").html("Here is your record of " + enteredMMYYU);
	$("#allTables").show();
	$("#ppDatesTableBody tr").remove();
	$("#dbmsDatesTableBody tr").remove();
	$("#cnDatesTableBody tr").remove();
	$("#dsDatesTableBody tr").remove();
	$("#ammpDatesTableBody tr").remove();
	$("#viewppTheoryLC tr").remove();
	$("#viewppTheoryLP tr").remove();
	$("#viewppPracticalLC tr").remove();
	$("#viewppPracticalLP tr").remove();
	$("#viewdbmsTheoryLC tr").remove();
	$("#viewdbmsTheoryLP tr").remove();
	$("#viewdbmsPracticalLC tr").remove();
	$("#viewdbmsPracticalLP tr").remove();
	$("#viewcnTheoryLC tr").remove();
	$("#viewcnTheoryLP tr").remove();
	$("#viewcnPracticalLC tr").remove();
	$("#viewcnPracticalLP tr").remove();
	$("#viewdsTheoryLC tr").remove();
	$("#viewdsTheoryLP tr").remove();
	$("#viewdsPracticalLC tr").remove();
	$("#viewdsPracticalLP tr").remove();
	$("#viewamTheoryLC tr").remove();
	$("#viewamTheoryLP tr").remove();
	$("#viewmpPracticalLC tr").remove();
	$("#viewmpPracticalLP tr").remove();
	var dates = firebase.database().ref('users/' + user.displayName + '/attendance/' + enteredMMYYV + '/');
	dates.on('value',function(snapshot){
		var dates = snapshot.val();
		var keys = Object.keys(dates);
		for(i=0;i<keys.length;i++){
			var k = keys[i];
			$('#ppDatesTableBody').append('<tr><td>'+k+'</td></tr>');
			$('#dbmsDatesTableBody').append('<tr><td>'+k+'</td></tr>');
			$('#cnDatesTableBody').append('<tr><td>'+k+'</td></tr>');
			$('#dsDatesTableBody').append('<tr><td>'+k+'</td></tr>');
			$('#ammpDatesTableBody').append('<tr><td>'+k+'</td></tr>');
		}
	});
	var getAllSubjectData = firebase.database().ref('users/' + user.displayName + '/attendance/' + enteredMMYYV + '/');
	var ppTheoryLCTotal=0;
	var ppTheoryLPTotal=0;
	var ppPracticalLCTotal=0;
	var ppPracticalLPTotal=0;
	var ppPercentageTheory=0;
	var ppPercentagePractical=0;
	var dbmsTheoryLCTotal=0;
	var dbmsTheoryLPTotal=0;
	var dbmsPracticalLCTotal=0;
	var dbmsPracticalLPTotal=0;
	var dbmsPercentageTheory=0;
	var dbmsPercentagePractical=0;
	var cnTheoryLCTotal=0;
	var cnTheoryLPTotal=0;
	var cnPracticalLCTotal=0;
	var cnPracticalLPTotal=0;
	var cnPercentageTheory=0;
	var cnPercentagePractical=0;
	var dsTheoryLCTotal=0;
	var dsTheoryLPTotal=0;
	var dsPracticalLCTotal=0;
	var dsPracticalLPTotal=0;
	var dsPercentageTheory=0;
	var dsPercentagePractical=0;
	var amTheoryLCTotal=0;
	var amTheoryLPTotal=0;
	var mpPracticalLCTotal=0;
	var mpPracticalLPTotal=0;
	var amPercentage=0;
	var mpPercentage=0;
	getAllSubjectData.on('child_added',function(snapshot){
		var ppTheoryLC = snapshot.child('ppTheoryLC').val();
		for(i=0; i < ppTheoryLC.length; i++){
			var k = ppTheoryLC[i];
			if(k != "0"){
				ppTheoryLCTotal = ppTheoryLCTotal + parseInt(k);
			};
			$('#viewppTheoryLC').append('<tr><td>'+k+'</td></tr>');
		}
		$("#ppTheoryLCTotal").html("<td>" + ppTheoryLCTotal + "</td>");
		var ppTheoryLP = snapshot.child('ppTheoryLP').val();
		for(i=0;i<ppTheoryLP.length;i++){
			var k = ppTheoryLP[i];
			if(k != "0"){
				ppTheoryLPTotal = ppTheoryLPTotal + parseInt(k);
			};
			$('#viewppTheoryLP').append('<tr><td>'+k+'</td></tr>');
		}
		$("#ppTheoryLPTotal").html("<td>" + ppTheoryLPTotal + "</td>");
		var ppPracticalLC = snapshot.child('ppPracticalLC').val();
		for(i=0;i<ppPracticalLC.length;i++){
			var k = ppPracticalLC[i];
			if(k != "0"){
				ppPracticalLCTotal = ppPracticalLCTotal + parseInt(k);
			};
			$('#viewppPracticalLC').append('<tr><td>'+k+'</td></tr>');
		}
		$("#ppPracticalLCTotal").html("<td>" + ppPracticalLCTotal + "</td>");
		var ppPracticalLP = snapshot.child('ppPracticalLP').val();
		for(i=0;i<ppPracticalLP.length;i++){
			var k = ppPracticalLP[i];
			if(k != "0"){
				ppPracticalLPTotal = ppPracticalLPTotal + parseInt(k);
			};
			$('#viewppPracticalLP').append('<tr><td>'+k+'</td></tr>');
		}
		$("#ppPracticalLPTotal").html("<td>" + ppPracticalLPTotal + "</td>");
		
		var dbmsTheoryLC = snapshot.child('dbmsTheoryLC').val();
		for(i=0;i<dbmsTheoryLC.length;i++){
			var k = dbmsTheoryLC[i];
			if(k != "0"){
				dbmsTheoryLCTotal = dbmsTheoryLCTotal + parseInt(k);
			};
			$('#viewdbmsTheoryLC').append('<tr><td>'+k+'</td></tr>');
		}
		$("#dbmsTheoryLCTotal").html("<td>" + dbmsTheoryLCTotal + "</td>");
		var dbmsTheoryLP = snapshot.child('dbmsTheoryLP').val();
		for(i=0;i<dbmsTheoryLP.length;i++){
			var k = dbmsTheoryLP[i];
			if(k != "0"){
				dbmsTheoryLPTotal = dbmsTheoryLPTotal + parseInt(k);
			};
			$('#viewdbmsTheoryLP').append('<tr><td>'+k+'</td></tr>');
		}
		$("#dbmsTheoryLPTotal").html("<td>" + dbmsTheoryLPTotal + "</td>");
		var dbmsPracticalLC = snapshot.child('dbmsPracticalLC').val();
		for(i=0;i<dbmsPracticalLC.length;i++){
			var k = dbmsPracticalLC[i];
			if(k != "0"){
				dbmsPracticalLCTotal = dbmsPracticalLCTotal + parseInt(k);
			};
			$('#viewdbmsPracticalLC').append('<tr><td>'+k+'</td></tr>');
		}
		$("#dbmsPracticalLCTotal").html("<td>" + dbmsPracticalLCTotal + "</td>");
		var dbmsPracticalLP = snapshot.child('dbmsPracticalLP').val();
		for(i=0;i<dbmsPracticalLP.length;i++){
			var k = dbmsPracticalLP[i];
			if(k != "0"){
				dbmsPracticalLPTotal = dbmsPracticalLPTotal + parseInt(k);
			};
			$('#viewdbmsPracticalLP').append('<tr><td>'+k+'</td></tr>');
		}
		$("#dbmsPracticalLPTotal").html("<td>" + dbmsPracticalLPTotal + "</td>");
		
		var cnTheoryLC = snapshot.child('cnTheoryLC').val();
		for(i=0;i<cnTheoryLC.length;i++){
			var k = cnTheoryLC[i];
			if(k != "0"){
				cnTheoryLCTotal = cnTheoryLCTotal + parseInt(k);
			};
			$('#viewcnTheoryLC').append('<tr><td>'+k+'</td></tr>');
		}
		$("#cnTheoryLCTotal").html("<td>" + cnTheoryLCTotal + "</td>");
		var cnTheoryLP = snapshot.child('cnTheoryLP').val();
		for(i=0;i<cnTheoryLP.length;i++){
			var k = cnTheoryLP[i];
			if(k != "0"){
				cnTheoryLPTotal = cnTheoryLPTotal + parseInt(k);
			};
			$('#viewcnTheoryLP').append('<tr><td>'+k+'</td></tr>');
		}
		$("#cnTheoryLPTotal").html("<td>" + cnTheoryLPTotal + "</td>");
		var cnPracticalLC = snapshot.child('cnPracticalLC').val();
		for(i=0;i<cnPracticalLC.length;i++){
			var k = cnPracticalLC[i];
			if(k != "0"){
				cnPracticalLCTotal = cnPracticalLCTotal + parseInt(k);
			};
			$('#viewcnPracticalLC').append('<tr><td>'+k+'</td></tr>');
		}
		$("#cnPracticalLCTotal").html("<td>" + cnPracticalLCTotal + "</td>");
		var cnPracticalLP = snapshot.child('cnPracticalLP').val();
		for(i=0;i<cnPracticalLP.length;i++){
			var k = cnPracticalLP[i];
			if(k != "0"){
				cnPracticalLPTotal = cnPracticalLPTotal + parseInt(k);
			};
			$('#viewcnPracticalLP').append('<tr><td>'+k+'</td></tr>');
		}
		$("#cnPracticalLPTotal").html("<td>" + cnPracticalLPTotal + "</td>");
		
		var dsTheoryLC = snapshot.child('dsTheoryLC').val();
		for(i=0;i<dsTheoryLC.length;i++){
			var k = dsTheoryLC[i];
			if(k != "0"){
				dsTheoryLCTotal = dsTheoryLCTotal + parseInt(k);
			};
			$('#viewdsTheoryLC').append('<tr><td>'+k+'</td></tr>');
		}
		$("#dsTheoryLCTotal").html("<td>" + dsTheoryLCTotal + "</td>");
		var dsTheoryLP = snapshot.child('dsTheoryLP').val();
		for(i=0;i<dsTheoryLP.length;i++){
			var k = dsTheoryLP[i];
			if(k != "0"){
				dsTheoryLPTotal = dsTheoryLPTotal + parseInt(k);
			};
			$('#viewdsTheoryLP').append('<tr><td>'+k+'</td></tr>');
		}
		$("#dsTheoryLPTotal").html("<td>" + dsTheoryLPTotal + "</td>");
		var dsPracticalLC = snapshot.child('dsPracticalLC').val();
		for(i=0;i<dsPracticalLC.length;i++){
			var k = dsPracticalLC[i];
			if(k != "0"){
				dsPracticalLCTotal = dsPracticalLCTotal + parseInt(k);
			};
			$('#viewdsPracticalLC').append('<tr><td>'+k+'</td></tr>');
		}
		$("#dsPracticalLCTotal").html("<td>" + dsPracticalLCTotal + "</td>");
		var dsPracticalLP = snapshot.child('dsPracticalLP').val();
		for(i=0;i<dsPracticalLP.length;i++){
			var k = dsPracticalLP[i];
			if(k != "0"){
				dsPracticalLPTotal = dsPracticalLPTotal + parseInt(k);
			};
			$('#viewdsPracticalLP').append('<tr><td>'+k+'</td></tr>');
		}
		$("#dsPracticalLPTotal").html("<td>" + dsPracticalLPTotal + "</td>");
		
		var amTheoryLC = snapshot.child('amTheoryLC').val();
		for(i=0;i<amTheoryLC.length;i++){
			var k = amTheoryLC[i];
			if(k != "0"){
				amTheoryLCTotal = amTheoryLCTotal + parseInt(k);
			};
			$('#viewamTheoryLC').append('<tr><td>'+k+'</td></tr>');
		}
		$("#amTheoryLCTotal").html("<td>" + amTheoryLCTotal + "</td>");
		var amTheoryLP = snapshot.child('amTheoryLP').val();
		for(i=0;i<amTheoryLP.length;i++){
			var k = amTheoryLP[i];
			if(k != "0"){
				amTheoryLPTotal = amTheoryLPTotal + parseInt(k);
			};
			$('#viewamTheoryLP').append('<tr><td>'+k+'</td></tr>');
		}
		$("#amTheoryLPTotal").html("<td>" + amTheoryLPTotal + "</td>");
		var mpPracticalLC = snapshot.child('mpPracticalLC').val();
		for(i=0;i<mpPracticalLC.length;i++){
			var k = mpPracticalLC[i];
			if(k != "0"){
				mpPracticalLCTotal = mpPracticalLCTotal + parseInt(k);
			};
			$('#viewmpPracticalLC').append('<tr><td>'+k+'</td></tr>');
		}
		$("#mpPracticalLCTotal").html("<td>" + mpPracticalLCTotal + "</td>");
		var mpPracticalLP = snapshot.child('mpPracticalLP').val();
		for(i=0;i<mpPracticalLP.length;i++){
			var k = mpPracticalLP[i];
			if(k != "0"){
				mpPracticalLPTotal = mpPracticalLPTotal + parseInt(k);
			};
			$('#viewmpPracticalLP').append('<tr><td>'+k+'</td></tr>');
		}
		$("#mpPracticalLPTotal").html("<td>" + mpPracticalLPTotal + "</td>");
		//calculating percentages
		ppPercentageTheory =  ((ppTheoryLPTotal/ppTheoryLCTotal)*100);
		ppPercentagePractical = ((ppPracticalLPTotal/ppPracticalLCTotal)*100);
		if(ppTheoryLPTotal == 0 && ppTheoryLCTotal == 0){
			ppPercentageTheory = 0;
		};
		if(ppPracticalLPTotal == 0 && ppPracticalLCTotal == 0){
			ppPercentagePractical = 0;
		};
		$("#ppPercentage").html(
			"<td>Theory: " +  ppPercentageTheory.toFixed(2) + ", Practical: " + ppPercentagePractical.toFixed(2) + "</td>"
		);
		dbmsPercentageTheory =  ((dbmsTheoryLPTotal/dbmsTheoryLCTotal)*100);
		dbmsPercentagePractical = ((dbmsPracticalLPTotal/dbmsPracticalLCTotal)*100);
		if(dbmsTheoryLPTotal == 0 && dbmsTheoryLCTotal == 0){
			dbmsPercentageTheory = 0;
		};
		if(dbmsPracticalLPTotal == 0 && dbmsPracticalLCTotal == 0){
			dbmsPercentagePractical = 0;
		};
		$("#dbmsPercentage").html(
			"<td>Theory: " +  dbmsPercentageTheory.toFixed(2) + ", Practical: " + dbmsPercentagePractical.toFixed(2) + "</td>"
		);
		cnPercentageTheory =  ((cnTheoryLPTotal/cnTheoryLCTotal)*100);
		cnPercentagePractical = ((cnPracticalLPTotal/cnPracticalLCTotal)*100);
		if(cnTheoryLPTotal == 0 && cnTheoryLCTotal == 0){
			cnPercentageTheory = 0;
		};
		if(cnPracticalLPTotal == 0 && cnPracticalLCTotal == 0){
			cnPercentagePractical = 0;
		};
		$("#cnPercentage").html(
			"<td>Theory: " +  cnPercentageTheory.toFixed(2) + ", Practical: " + cnPercentagePractical.toFixed(2) + "</td>"
		);
		dsPercentageTheory =  ((dsTheoryLPTotal/dsTheoryLCTotal)*100);
		dsPercentagePractical = ((dsPracticalLPTotal/dsPracticalLCTotal)*100);
		if(dsTheoryLPTotal == 0 && dsTheoryLCTotal == 0){
			dsPercentageTheory = 0;
		};
		if(dsPracticalLPTotal == 0 && dsPracticalLCTotal == 0){
			dsPercentagePractical = 0;
		};
		$("#dsPercentage").html(
			"<td>Theory: " +  dsPercentageTheory.toFixed(2) + ", Practical: " + dsPercentagePractical.toFixed(2) + "</td>"
		);
		amPercentage =  ((amTheoryLPTotal/amTheoryLCTotal)*100);
		mpPercentage = ((mpPracticalLPTotal/mpPracticalLCTotal)*100);
		if(amTheoryLPTotal == 0 && amTheoryLCTotal == 0){
			amPercentage = 0;
		};
		if(mpPracticalLPTotal == 0 && mpPracticalLCTotal == 0){
			mpPercentage = 0;
		};
		$("#ammpPercentage").html(
			"<td>Theory: " +  amPercentage.toFixed(2) + ", Practical: " + mpPercentage.toFixed(2) + "</td>"
		);
		var n=10;
		if(ppPercentageTheory == 0){n = n-1;};
		if(ppPercentagePractical == 0){n = n-1;};
		if(dbmsPercentageTheory == 0){n = n-1;};
		if(dbmsPercentagePractical == 0){n = n-1;};
		if(cnPercentageTheory == 0){n = n-1;};
		if(cnPercentagePractical == 0){n = n-1;};
		if(dsPercentageTheory == 0){n = n-1;};
		if(dsPercentagePractical == 0){n = n-1;};
		if(amPercentage == 0){n = n-1;};
		if(mpPercentage == 0){n = n-1;};
		if(ppPercentageTheory == 0 && ppPercentagePractical == 0 && dbmsPercentageTheory == 0 && dbmsPercentagePractical == 0 && cnPercentageTheory == 0 && cnPercentagePractical == 0 && dsPercentageTheory == 0 && dsPercentagePractical == 0 && amPercentage == 0 && mpPercentage == 0){n=1;};
		var overallPercentage = ((ppPercentageTheory + ppPercentagePractical + dbmsPercentageTheory + dbmsPercentagePractical + cnPercentageTheory + cnPercentagePractical + dsPercentageTheory + dsPercentagePractical + amPercentage + mpPercentage)/n);
		$("#overallPercentage").html("Your overall percentage is " + overallPercentage.toFixed(2));
	});
};
function viewAttendance(){
	$("#handlesViewAttendance").show();
	$("#handlesUpdateAttendance").hide();
	$("#allTables").hide();
};
function updateAttendance(){
	$("#handlesViewAttendance").hide();
	$("#handlesUpdateAttendance").show();
	$("#enterDDU").show();
	$("#enterMMU").show();
	$("#enterYYU").show();
	$("#selectDateU").show();
	$("#attendanceTables").hide();
};
function clearInputsDates(){
	$("#ppTheoryLC").val(null);
	$("#ppTheoryLP").val(null);
	$("#dbmsTheoryLC").val(null);
	$("#dbmsTheoryLP").val(null);
	$("#cnTheoryLC").val(null);
	$("#cnTheoryLP").val(null);
	$("#dsTheoryLC").val(null);
	$("#dsTheoryLP").val(null);
	$("#amTheoryLC").val(null);
	$("#amTheoryLP").val(null);
	$("#ppPracticalLC").val(null);
	$("#ppPracticalLP").val(null);
	$("#dbmsPracticalLC").val(null);
	$("#dbmsPracticalLP").val(null);
	$("#cnPracticalLC").val(null);
	$("#cnPracticalLP").val(null);
	$("#dsPracticalLC").val(null);
	$("#dsPracticalLP").val(null);
	$("#mpPracticalLC").val(null);
	$("#mpPracticalLP").val(null);
	$("#enteredDDU").val(null);
	$("#enteredMMU").val(null);
	$("#enteredYYU").val(null);
	$("#enteredDDV").val(null);
	$("#enteredMMV").val(null);
	$("#enteredYYV").val(null);
};
var enteredDate;
var enteredMMYYU;
function selectDateU(){
	var enteredDDU = document.getElementById("enteredDDU").value;
	var enteredMMU = document.getElementById("enteredMMU").value;
	var enteredYYU = document.getElementById("enteredYYU").value;
	enteredMMYYU = enteredMMU + "-" + enteredYYU;
	enteredDate = enteredDDU + "-" + enteredMMU + "-" + enteredYYU;
	$("#descDate").html("Update your attendance for the date " + enteredDate + " by using the following table.");
	$("#attendanceTables").show();
	clearInputsDates();
	$("#attendanceTablesSave").html("Save");
};
function attendanceTablesSave(){
	var ppTheoryLC = document.getElementById("ppTheoryLC").value;
	if(ppTheoryLC == ""){ppTheoryLC = "0";};
	var dbmsTheoryLC = document.getElementById("dbmsTheoryLC").value;
	if(dbmsTheoryLC == ""){dbmsTheoryLC = "0";};
	var cnTheoryLC = document.getElementById("cnTheoryLC").value;
	if(cnTheoryLC == ""){cnTheoryLC = "0";};
	var dsTheoryLC = document.getElementById("dsTheoryLC").value;
	if(dsTheoryLC == ""){dsTheoryLC = "0";};
	var amTheoryLC = document.getElementById("amTheoryLC").value;
	if(amTheoryLC == ""){amTheoryLC = "0";};
	var ppTheoryLP = document.getElementById("ppTheoryLP").value;
	if(ppTheoryLP == ""){ppTheoryLP = "0";};
	var dbmsTheoryLP = document.getElementById("dbmsTheoryLP").value;
	if(dbmsTheoryLP == ""){dbmsTheoryLP = "0";};
	var cnTheoryLP = document.getElementById("cnTheoryLP").value;
	if(cnTheoryLP == ""){cnTheoryLP = "0";};
	var dsTheoryLP = document.getElementById("dsTheoryLP").value;
	if(dsTheoryLP == ""){dsTheoryLP = "0";};
	var amTheoryLP = document.getElementById("amTheoryLP").value;
	if(amTheoryLP == ""){amTheoryLP = "0";};
	var ppPracticalLC = document.getElementById("ppPracticalLC").value;
	if(ppPracticalLC == ""){ppPracticalLC = "0";};
	var dbmsPracticalLC = document.getElementById("dbmsPracticalLC").value;
	if(dbmsPracticalLC == ""){dbmsPracticalLC = "0";};
	var cnPracticalLC = document.getElementById("cnPracticalLC").value;
	if(cnPracticalLC == ""){cnPracticalLC = "0";};
	var dsPracticalLC = document.getElementById("dsPracticalLC").value;
	if(dsPracticalLC == ""){dsPracticalLC = "0";};
	var mpPracticalLC = document.getElementById("mpPracticalLC").value;
	if(mpPracticalLC == ""){mpPracticalLC = "0";};
	var ppPracticalLP = document.getElementById("ppPracticalLP").value;
	if(ppPracticalLP == ""){ppPracticalLP = "0";};
	var dbmsPracticalLP = document.getElementById("dbmsPracticalLP").value;
	if(dbmsPracticalLP == ""){dbmsPracticalLP = "0";};
	var cnPracticalLP = document.getElementById("cnPracticalLP").value;
	if(cnPracticalLP == ""){cnPracticalLP = "0";};
	var dsPracticalLP = document.getElementById("dsPracticalLP").value;
	if(dsPracticalLP == ""){dsPracticalLP = "0";};
	var mpPracticalLP = document.getElementById("mpPracticalLP").value;
	if(mpPracticalLP == ""){mpPracticalLP = "0";};
	firebase.database().ref('users/' + user.displayName + '/attendance/' + enteredMMYYU + '/' + enteredDate).set({
		ppTheoryLC: ppTheoryLC,
		dbmsTheoryLC: dbmsTheoryLC,
		cnTheoryLC: cnTheoryLC,
		dsTheoryLC: dsTheoryLC,
		amTheoryLC: amTheoryLC,
		ppTheoryLP: ppTheoryLP,
		dbmsTheoryLP: dbmsTheoryLP,
		cnTheoryLP: cnTheoryLP,
		dsTheoryLP: dsTheoryLP,
		amTheoryLP: amTheoryLP,
		ppPracticalLC: ppPracticalLC,
		dbmsPracticalLC: dbmsPracticalLC,
		cnPracticalLC: cnPracticalLC,
		dsPracticalLC: dsPracticalLC,
		mpPracticalLC: mpPracticalLC,
		ppPracticalLP: ppPracticalLP,
		dbmsPracticalLP: dbmsPracticalLP,
		cnPracticalLP: cnPracticalLP,
		dsPracticalLP: dsPracticalLP,
		mpPracticalLP: mpPracticalLP
	});
	$("#attendanceTablesSave").html("Saved, Click to save again.");
	clearInputsDates();
};
$("#logoutBtn").click(
	function(){
		$("#welcomeText").html("You have been successfully logged out, " + user.displayName); 
		firebase.auth().signOut().then(function() {
		}).catch(function(error) {
			alert(error.message);
		});
		logout();
	}
);
function logout(){
	$("#loginBtn").show();
	$("#logoutBtn").hide();
	$("#home").show();
	$("#welcomeUser").hide();
};