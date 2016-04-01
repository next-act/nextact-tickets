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