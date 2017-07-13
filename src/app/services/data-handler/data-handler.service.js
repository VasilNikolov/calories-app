/**
 * Service for handling our requests to firebase
 */
export function dataHandler() {
	let data = null,
		self = this;

	/**
	 * Sets the data
	 * @param {Array} newData - The new data we want to set
	 */
	this.set = (newData) => {
		data = newData;
	};
	/**
	 *  Reads all the meals
	 * @returns {promise}
	 */
	this.readAllMeals = () => {
		return firebase.database().ref('/meals/').once('value');
	};

	/**
	 * Creates a new meal
	 * @param {string} description
	 * @param {string} calories
	 */
	this.newMeal = (description, calories) => {
		// Get the current user's email
		let user = firebase.auth().currentUser,
			email = user.email;

		// A post entry.
		let currentdate = new Date();

		let date = currentdate.getDate() + "/"
			+ (currentdate.getMonth()+1)  + "/"
			+ currentdate.getFullYear();

		let time = + currentdate.getHours() + ":"
			+ currentdate.getMinutes() + ":"
			+ currentdate.getSeconds();

		let postData = {
			date: date,
			time: time,
			description: description,
			calories: calories
		};
		console.log(postData);
		// // Get a key for a new meal.
		// let newMeal = firebase.database().ref().child('meals').push().key;
		//
		// // Write the new meal data
		// let updates = {};
		// updates['/meals/' + email + '/' + newMeal] = postData;
		// firebase.database().ref().update(updates);
		// this.readData(user.uid);
	};
	/**
	 * Set the target calories for giver user
	 * @param {string} target - The target calories
	 * @param {string} uid - The user's uid
	 */
	this.setCalories = (target, uid) => {
		firebase.database().ref('/users/' + uid).update({
			targetCalories: target
		});
	};

	/**
	 * Processes and orders the raw data from firebase.
	 * @param snapshot - Firebase promise containing meals
	 * @returns {Array}
	 */
	this.processMeals = (snapshot) => {
		let obj = snapshot.val();
		let arr = [];
		for (let val in obj) {
			let myObj = {
				date: obj[val].date,
				time: obj[val].time,
				description: obj[val].description,
				calories: obj[val].calories,
				id: val
			};
			arr.push(myObj);
		}
		self.set(arr);
		return arr;
	};

	/**
	 * Retrieves and orders all the meals of a given user and stores them.
	 * @param {string} dir - The directory we want to access
	 * @param {string} type - If 'm', processes the melas, if unset, returns the promise.
	 * @returns promise - The promise from firebase
	 */
	this.readData = (type = 'm', dir) => {
		let user = firebase.auth().currentUser;
		if (user) {
			if (type === 'm') {
				return firebase.database().ref('/meals/' + user.uid).once('value')
					.then(function (snapshot) {
						return self.processMeals(snapshot);
					});
			} else if (type === 'p') {
				return firebase.database().ref(dir + user.uid).once('value')
					.then(function (snapshot) {
						return snapshot;
					});
			}
		}
	};

	/**
	 * Gets the current data
	 * @returns data - The currently stored data
	 */
	this.getData = () => {
		if (data === null) {

		} else {
			return data;
		}
	};
}