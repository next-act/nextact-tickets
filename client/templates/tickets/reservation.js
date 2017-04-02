Template.reservation.events({
	'click #submit': function (event) {
		event.preventDefault();
		var reservationId = this._id;
		Meteor.call('deleteReservation', reservationId, function(error, result) {
			if (error) {
				return throwError(error.reason);
			}
			Router.go('cancel');
		})
	}
})

Template.reservation.helpers({
	getShow: function(show){
	if(show === "Thursday April 7th")
		return "Thursday April 6th"
	else if(show === "Friday April 8th")
		return "Friday April 7th";
	else if(show === "Saturday April 9th")
		return "Saturday April 8th";
	return "Error in conversion";	
	}
});