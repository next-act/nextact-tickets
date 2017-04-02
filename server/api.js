// TODO: make server side error propogate to client
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
				show: reverseShowDate(reservation.show),
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

/**
 * This is a shitty function to patch a bug that I did with the show dates. 
 * Input: show date strings (April 7th/8th/9th)
 * Returns: show date string which correctly corresponds to show (April 6th/7th/8th)
 */
function reverseShowDate(show){
	if(show === "Thursday April 7th")
		return "Thursday April 6th"
	else if(show === "Friday April 8th")
		return "Friday April 7th";
	else if(show === "Saturday April 9th")
		return "Saturday April 8th";
	return "Error in conversion";	
}
