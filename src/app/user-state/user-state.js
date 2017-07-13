

export function userAccess ($location, $window, $rootScope) {

	/**
	 * Function for handling access
	 * @param {Object} user -  optional firebase user object, default is null
	 */
	let accessHandler = (user = null) => {
		if (user !== null) {
			//User is logged in
			let uid = user.uid;
			firebase.database().ref('/users/' + uid).once('value').then(function (snapshot) {
				let obj = snapshot.val();
				try {
					let access = obj.access;
					switch (access) {
						case 'admin':
							console.log('admin');
							break;
						case 'manager':
							alert('You are a manager!');
							break;
						default:
							$rootScope.$apply(function () {
								$location.path("/logged-in");
							});
							break;
					}
				} catch (e) {
					console.log(e);
				}
			});
		} else {
			//listener to watch route changes
			$rootScope.$on("$routeChangeStart", function (event, next, current) {
				if (firebase.auth().currentUser === null) {
					// no logged user, we should be going to #login
					if (next.templateUrl === "/src/app/login/login.tpl.html" || next.templateUrl === "/src/app/register/register.tpl.html") {
						// already going to login, no redirect needed
					} else {
						// not going to login, we should redirect now
						$location.path("/login");
					}
				}
			});
		}
	};

	// Sign out user every time you reload
	firebase.auth().signOut();

	// Firebase listener for authentication state changes
	firebase.auth().onAuthStateChanged(function (user) {
		accessHandler(user);
	});

	// calling accessHandler so it handles the initial loading
	accessHandler();
}