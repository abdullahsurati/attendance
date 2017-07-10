var user;
var provider = new firebase.auth.GoogleAuthProvider();
$(document).ready(function() {
	$("#logoutBtn").hide();
});
$("#loginBtn").click(
	function () {
		console.log();
		firebase.auth().signInWithPopup(provider).then(function(result) {
		var token = result.credential.accessToken;
		user = result.user;
		console.log(user.displayName);
		showWelcome();
		}).catch(function(error) {
			var errorCode = error.code;
			var errorMessage = error.message;
			var email = error.email;
			var credential = error.credential;
		});
	}
);
function showWelcome(){
	$("#loginBtn").hide();
	$("#logoutBtn").show();
	$("#welcome").show();
	$("#welcomeText").html("Welcome, " + user.displayName);
};
$("#logoutBtn").click(
	function(){
		console.log();
		$("#welcomeText").html("You have been successfully logged out, " + user.displayName); 
		firebase.auth().signOut().then(function() {
		$("#loginBtn").show();
		$("#logoutBtn").hide();
		}).catch(function(error) {
			alert(error.message);
		});
	}
);