// TODO: Make this fixture be dependent on a control unit rather than hard coded
if (Count.find().count() === 0 ) {
	Count.insert({
		show: 'Thursday April 7th',
		availableSeats: 145
	});
	Count.insert({
		show: 'Friday April 8th',
		availableSeats: 145
	});
	Count.insert({
		show: 'Saturday April 9th',
		availableSeats: 145
	});
}