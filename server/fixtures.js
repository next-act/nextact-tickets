if (Count.find().count() === 0 ) {
	var show_details = Meteor.settings.public;
	var num_seats = show_details.open_seats;
	Count.insert({
		show: show_details.first_showing,
		availableSeats: num_seats
	});
	Count.insert({
		show: show_details.second_showing,
		availableSeats: num_seats
	});
	Count.insert({
		show: show_details.third_showing,
		availableSeats: num_seats
	});
}