Template.secret.onCreated(function () {
	Session.set('secretErrors', {});
});

Template.secret.helpers({
	errorMessage: function (field) {
		return Session.get('secretErrors')[field];
	},
	errorClass: function (field) {
		return !!Session.get('secretErrors')[field] ? 'has-error' : '';
	}
});

Template.secret.events({
	'click #submit': function (event) {
		event.preventDefault();
		var prefroshTickets = !!($('#prefrosh-tickets').val()) ? parseInt($('#prefrosh-tickets').val()) : 0;
		var mitTickets = !!($('#mit-tickets').val()) ? parseInt($('#mit-tickets').val()) : 0;
		var otherTickets = !!($('#other-tickets').val()) ? parseInt($('#other-tickets').val()) : 0;
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
			return Session.set('secretErrors', errors);
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