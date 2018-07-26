
var Main = new Vue({
	el: '#main-app',
	data: {
		siteState: 'reg',
		teams: [],
		gotTeams: 0,
		regUserWaiting: false,
		regGamerTagError: "",
		regNameError: "",
		regGamerTagAlreadyUsed: 2,
		regTeamWaiting: false,
		gotPlayers: 0,
		players: [{"name": "-", "tag": "-"}],
		regTeamNameError: "",
		regTeamLeaderNameError: "",
		regTeamMsg: "",
		regUserMsg: ""
	}
	,
	methods: {
		
		siteStateChange : function(val) {
			if ( val == 'teams' && this.gotTeams == 0 ) {
				getTeams();
				this.gotTeams = 1;
			}
			if ( val == 'plrs' && this.gotPlayers == 0 ) {
				getPlayers();
				this.gotPlayers = 1;
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

		regUserFormSubmit: function() {
			this.regUserWaiting = !this.regUserWaiting;
			// Functions concerning the user form are in UserFormFuncs.js
			VerifyUserForm();			
			this.regUserWaiting = !this.regUserWaiting;
		}, 

		regTeamFormSubmit: function() {
			// Functions concerning the team form are in TeamFormFuncs.js
			this.regTeamWaiting = !this.regTeamWaiting;
			VerifyRegTeamForm();
			this.regTeamWaiting = !this.regTeamWaiting;
		}
	}
});


// Gets all the teams from the server
var getTeams = function () {
	fetch("/teams/showteams/", {
		mode: 'no-cors'
	}).then(function(res) {
		res.json().then(function(data) {
			Main.teams = data;
		});
	}).catch(function(err) {
		console.log(err);
	});
}

// Get the list of players
var getPlayers = function () {
	fetch("/teams/showusers/", {
		mode: 'no-cors'
	}).then(function(res) {
		console.log(res);
		res.json().then(function(data) {
			if ( data.length > 0 ) {
				Main.players = data;
			}
		});
	}).catch(function(err) {
		console.log(err);
	});
}