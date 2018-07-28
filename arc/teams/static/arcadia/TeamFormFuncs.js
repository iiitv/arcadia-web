var VerifyRegTeamForm = function() {
	var teamName = Main.$refs.teamName;
	var regTeamLeaderName = Main.$refs.teamLeaderName;
	if ( teamName.value == "" || teamName.value == null ) {
		Main.regTeamNameError = "Enter a team name.";
		teamName.attributes.class.value = "invalid";
	} else {
		fetch('/users/checkteamname/', {
			method: "POST",
			headers: {
				"Content-Type": "application/json; charset=utf-8"
			},
			body: JSON.stringify({"name": teamName.value })
		})
		.then(function(response) {
			response.json().then(function(data) {
				if ( data.presence ) {
					// Username already used.
					teamName.attributes.class.value = "invalid";
					console.log("Teamname", teamName.attributes.class.value);
					Main.regTeamNameError = "Team Name Already used";
					Main.regTeamMsg = "Fill the details correctly";
				} else {
					// No problem
					teamName.attributes.class.value = "valid";
					Main.regTeamNameError = "Looks like the winners are here!";
					if ( teamLeaderName.value == "" || teamLeaderName.value == null ) {
						Main.regTeamLeaderNameError = "Enter team leader name.";
						teamLeaderName.attributes.class.value = "invalid";
						Main.regTeamMsg = "Fill the details correctly";
					} else {
						Main.regTeamLeaderNameError = "";
						teamLeaderName.attributes.class.value = "valid";
						RegTeamFormSubmit();
					}
				}
			});
		}).catch(function(err) {
			console.log(err);
		});
	}
}


var RegTeamFormSubmit =  function() {
	if ( Main.$refs.teamLeaderName.attributes.class.value == "valid" && Main.$refs.teamName.attributes.class.value == "valid" ) {
		console.log("Heloooooooo");
		// Both errors are empty, thus form is good to submit
		fetch('/teams/showteams/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				"team_name": Main.$refs.teamName.value,
				"leader": Main.$refs.teamLeaderName.value,
				"member": "To be auctioned.",
				"membertag": "-",
				"member2": "To be auctioned.",
				"member2tag": "-",
				"member3": "To be auctioned.",
				"member3tag": "-",
				"member4": "To be auctioned.",
				"member4tag": "-",
				"member5": "To be auctioned.",
				"member5tag": "-",
			})
		}).then(function(response) {
			console.log(response);
			if ( response.status == 201 ) {
				Main.regTeamMsg = "Your team has been registered. Please contact ... for payment and verification.";
			} else {
				Main.regTeamMsg = "There was a problem while connecting server. Try again later.";
			}
		}).catch(function(err) {
			console.log(err);
		});
	}
}