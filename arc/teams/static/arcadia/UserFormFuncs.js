var VerifyUserForm = function() {
	var gtag = Main.$refs.regGamerTagRef;
	if ( (gtag.value == "" || gtag.value == null) ) {
		// Check if username is empty
		gtag.attributes.class.value = "invalid";
		Main.regGamerTagError = "Enter a Gamer Tag";
		VerifyUserName(false);
		Main.regUserMsg = "Fill the details correctly";
	} else {
		// Fetch the username: 
		fetch('/users/checkusername/', {
			method: "POST",
			headers: {
				"Content-Type": "application/json; charset=utf-8"
			},
			body: JSON.stringify({"name": gtag.value})
		})
		.then(function(response) {
			response.json().then(function(data) {
				if ( data.presence ) {
					// Username already used.
					gtag.attributes.class.value = "invalid";
					Main.regGamerTagError = "Gamer Tag Already used";
					VerifyUserName(false);
					Main.regUserMsg = "Fill the details correctly";
				} else {
					// No problem
					gtag.attributes.class.value = "valid";
					Main.regGamerTagError = "Good to go!";
					VerifyUserName(true);
				}
			});
		}).catch(function(err) {
			console.log(err);
		});
	}
}




var VerifyUserName = function(post) {
	var uname = Main.$refs.userName.value;
	if ( (uname == "" || uname == null) ) {
		Main.$refs.userName.attributes.class.value = "invalid";
		Main.regNameError = "Enter a Name";
		Main.regUserMsg = "Fill the details correctly";
	} else {
		Main.$refs.userName.attributes.class.value = "valid";
		Main.regNameError = "Nice!"
		if ( post ) {
			UserFormPost();
		}
	}
}



var UserFormPost = function() {
	fetch('/teams/register/', {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({"name": Main.$refs.userName.value, "tag": Main.$refs.regGamerTagRef.value})
	})
	.then(function(res) {
		if ( res.status == 201 ) {
			Main.regUserMsg = "You are successfuly registered. Contact ... for payment and verification.";
		} else {
			Main.regUserMsg = "Some error while contacting server. Please try again later.";
		}
	})
	.catch(function(err) {
		console.log(err);
	});
}