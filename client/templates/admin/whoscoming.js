Template.whoscoming.helpers({
	tickets: function () {
		return Reservations.find({show: this.show});
	},
	ticketsLeft: function () {
		return Count.findOne({show: this.show}).availableSeats;
	},
	"first_showing":Meteor.settings.public.first_showing,
	"second_showing":Meteor.settings.public.second_showing,
	"third_showing":Meteor.settings.public.third_showing,
	
});

Template.whoscoming.events({
	'click #submit': function (event) {
		event.preventDefault();
		var show = $('#show-date').val();
		Router.go('whoscoming', {show: show});
	},
	'click .cancel-reservation':function(event){
		event.preventDefault();	
		var reservationId = this._id;
		Meteor.call('deleteReservation', reservationId, function(error, result) {
			if (error) {
				return throwError(error.reason);
			}
			var show = $('#show-date').val();
			Router.go('whoscoming', {show: show});
		})
	}
});