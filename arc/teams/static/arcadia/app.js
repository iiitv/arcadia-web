
var Main = new Vue({
	el: '#main-app',
	data: {
		siteState: 'reg',
		teams: [],
		gotTeams: 0,
		regUserWaiting: false,
		regGamerTagError: "",
		regNameError: "",
		regGamerTagAlreadyUsed: 2
	}
	,
	methods: {
		
		siteStateChange : function(val) {
			if ( val == 'teams' && this.gotTeams == 0 ) {
				getTeams();
				this.gotTeams = 1;
			}
			this.siteState = val;
		},

		getTabClass: function(val) {
			if ( val == this.siteState ) {
				return "tab waves-effect waves-light " + "active";
			} else {
				return "tab waves-effect waves-light";
			}
		},

		verifyUserName: function() {
			var uname = this.$refs.userName.value;
			if ( (uname == "" || uname == null) ) {
				this.$refs.userName.attributes.class.value = "invalid";
				this.regNameError = "Enter a Name";
			} else {
				this.$refs.userName.attributes.class.value = "valid";
				this.regNameError = "Nice!"
			}
			console.log(this.regNameError);
		},

		verifyGamerTag: function() {
			var gtag = this.$refs.regGamerTagRef;
			var instance = this;
			if ( (gtag.value == "" || gtag.value == null) ) {
				// Check if username is empty
				gtag.attributes.class.value = "invalid";
				this.regGamerTagError = "Enter a Gamer Tag";
			} else {
				// Fetch the username: 
				fetch('http://localhost:3000/users/checkgamertag?tag=' + gtag.value)
				.then(function(response) {
					response.json().then(function(data) {
						console.log(data);
						if ( data.presence ) {
							// Username already used.
							gtag.attributes.class.value = "invalid";
							instance.regGamerTagError = "Gamer Tag Already used";
						} else {
							// No problem
							gtag.attributes.class.value = "valid";
							instance.regGamerTagError = "Good to go!";
						}
					});
				});
			}
		},

		regFormSubmit: function() {
			console.log("Hello");
			this.regUserWaiting = !this.regUserWaiting;
			this.verifyUserName();
			this.verifyGamerTag();
			if ( this.regNameError == "Nice!" && this.regGamerTagError == "Good to go!") {
				console.log("Can submit");
			}
			this.regUserWaiting = !this.regUserWaiting;
		}
	}
});


// Gets all the teams from the server
var getTeams = function () {
	fetch("http://localhost:8000/teams/showteams/", {
		mode: 'no-cors'
	}).then(function(res) {
		console.log(res);
		res.json().then(function(data) {
			
			Main.teams = data.teams;
		});
	}).catch(function(err) {
		console.log(err);
	});
}