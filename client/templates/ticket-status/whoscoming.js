Template.whoscoming.helpers({
	tickets: function () {
		return Reservations.find({show: this.show});
	}
});

Template.whoscoming.events({
	'click #submit': function (event) {
		event.preventDefault();
		var show = $('#show-date').val();
		Router.go('whoscoming', {show: show});
	}
});