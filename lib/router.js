Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	notFoundTemplate: 'notFound',
	waitOn: function() {
		return [Meteor.subscribe("reservations"), Meteor.subscribe("reserveCount")];
	}
});

Router.route('/', {name: 'tickets'});

Router.route('/secret', {name: 'secret'});

Router.route('/admin', {name: 'admin'});

Router.route('/admin/whoscoming/:show', {
	name: 'whoscoming',
	data: function () {
		return {show: this.params.show};
	}
})

Router.route('/reservation/:_id', {
	name: 'reservation',
	data: function () {
		return Reservations.findOne(this.params._id);
	}
});

Router.route('/cancel', {name: 'cancel'});

Router.onBeforeAction('dataNotFound', {only: 'reservation'});