Reservations = new Mongo.Collection('reservations');
Count = new Mongo.Collection('reserveCount');

validateReservation = function (reservation) {
	var errors = {};
	if (!reservation.fullname) {
		errors.fullname = "Please fill in your name";
	}
	var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if (!emailRegex.test(reservation.email)) {
		errors.email = "Please fill a valid email";
	}
	var amount = reservation.prefroshTickets + reservation.mitTickets + reservation.otherTickets;
	if (reservation.prefroshTickets < 0 | reservation.mitTickets < 0 | reservation.otherTickets < 0) {
		errors.amount = "Please enter a positive number of tickets";
	}
	if (amount > 2) {
		errors.amount = "Please reserve no more than two tickets";
	}
	if (amount == 0) {
		errors.amount = "Please reserve at least one ticket";
	}
	return errors;
}

Meteor.methods({
	reserveTicket: function (reservation) {
		// Syntax Check
		check(reservation, {
			fullname: String,
			email: String,
			show: String,
			prefroshTickets: Number,
			mitTickets: Number,
			otherTickets: Number
		});
		var errors = validateReservation(reservation);
		if (errors.fullname || errors.email || errors.amount) {
			throw new Meteor.Error('invalid-reservation', 'Please enter your name, email and the amount of tickets you want');
		}
		// Check if there are enough seats
		var show = reservation.show;
		var availableSeats = Count.findOne({show: show}).availableSeats;
		var reservationAmount = reservation.prefroshTickets + reservation.mitTickets + reservation.otherTickets;
		if (availableSeats < reservationAmount) {
			throw new Meteor.Error('show-full', 'Sorry. There are no more seats left in this show.');
		}
		// Check if the person has reserved before
		var prevReservation = Reservations.findOne({email: reservation.email, show: reservation.show});
		if (prevReservation) {
			throw new Meteor.Error('already-reserved', 'You have already reserved a ticket for this show. You can cancel the existing one and make a new one.');
		}
		// Updating number of left seats
		var leftSeats = availableSeats - reservationAmount;
		Count.update({show: show}, {$set: {availableSeats: leftSeats}});
		// Adding the new reservation
		var reservationToDb = _.extend(reservation, {
			date: new Date()
		});
		var resId = Reservations.insert(reservationToDb);
		return {
			_id: resId
		};
	},
	deleteReservation: function (reservationId) {
		check(reservationId, String);
		var reservation = Reservations.findOne(reservationId);
		var seats = reservation.prefroshTickets + reservation.mitTickets + reservation.otherTickets;
		Count.update({show: reservation.show}, {$inc: {availableSeats: seats}});
		Reservations.remove(reservationId);
		return;
	}
});