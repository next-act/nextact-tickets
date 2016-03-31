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
		var mitTickets = !!($('#mit-tickets').val()) ? parseInt($('#prefrosh-tickets').val()) : 0;
		var otherTickets = !!($('#other0-tickets').val()) ? parseInt($('#prefrosh-tickets').val()) : 0;
		var reservation = {
			fullname: $('#fullname').val(),
			email: $('#email').val(),
			show: $('#show-date').val(),
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