Meteor.methods({
	sendEmail: function (id) {
		// Syntax Check
		check(id, String);
		var reservation = Reservations.findOne(id);
		HTTP.call('POST', 'http://web.mit.edu/bin/cgiemail/nextact/www/form.txt', {
			headers: {
				'content-type' : 'application/x-www-form-urlencoded'
			},
			params: {
				id: reservation._id,
				fullname: reservation.fullname, 
				email: reservation.email,
				show: reservation.show,
				prefroshTickets: reservation.prefroshTickets,
				mitTickets: reservation.mitTickets,
				otherTickets: reservation.otherTickets
			}
		}, function (error, response) {
			if (error) {
				throw new Meteor.Error(error);
			}
			return;
		});
	}
});