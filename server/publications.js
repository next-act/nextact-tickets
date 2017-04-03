// TODO: make publications more secure
Meteor.publish('reservations', function() {
	return Reservations.find();
})

Meteor.publish('reserveCount', function() {
	return Count.find();
})
