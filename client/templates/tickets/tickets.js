Template.tickets.onCreated(function () {
	Session.set('ticketErrors', {});
});

Template.tickets.helpers({
	errorMessage: function (field) {
		return Session.get('ticketErrors')[field];
	},
	errorClass: function (field) {
		return !!Session.get('ticketErrors')[field] ? 'has-error' : '';
	}
});

Template.tickets.events({
	'click #submit': function (event) {
		event.preventDefault();
		var prefroshTickets = !!($('#prefrosh-tickets').val()) ? parseInt($('#prefrosh-tickets').val()) : 0;
		var mitTickets = !!($('#mit-tickets').val()) ? parseInt($('#mit-tickets').val()) : 0;
		var otherTickets = !!($('#other-tickets').val()) ? parseInt($('#other-tickets').val()) : 0;
		var reservation = {
			fullname: $('#fullname').val(),
			email: $('#email').val(),
			show: changeShowDate($('#show-date').val()),
			prefroshTickets: prefroshTickets,
			mitTickets: mitTickets,
			otherTickets: otherTickets
		}
		var errors = validateReservation(reservation);
		if(errors.fullname || errors.email || errors.amount) {
			return Session.set('ticketErrors', errors);
		}
		Meteor.call('reserveTicket', reservation, function (error, result) {
			if (error) {
				return throwError(error.reason);
			}
			Meteor.call('sendEmail', result._id, function (error, result) {
				if (error) {
					return throwError(error.reason);
				}
			});
			Router.go('reservation', result);
		});
	}
});

/**
 * This is a shitty function to patch a bug that I did with the show dates. 
 * Input: show date strings (April 6th/7th/8th)
 * Returns: show date string which correctly corresponds to database (April 7th/8th/9th)
 */
function changeShowDate(show){
	if(show === "Thursday April 6th")
		return "Thursday April 7th"
	else if(show === "Friday April 7th")
		return "Friday April 8th";
	else if(show === "Saturday April 8th")
		return "Saturday April 9th";
	return "Error in conversion";	
}
