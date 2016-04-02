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

var requireAdmin = function () {
	if (! Meteor.user()) {
		if (Meteor.loggingIn()) {
			this.render(this.loadingTemplate);
		} else {
			this.render('accessDenied');
		}
	} else if (Meteor.user().username === 'admin') {
		this.next();
	} else {
		this.render('accessDenied');
	}
}

Router.onBeforeAction('dataNotFound', {only: 'reservation'});
Router.onBeforeAction(requireAdmin, {only: 'whoscoming'})